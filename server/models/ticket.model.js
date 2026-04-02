import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({

    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    numberTickets: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
},
{timestamps: true});

// Middleware to restore tickets to event before deleting a ticket
// This runs for findOneAndDelete, findByIdAndDelete
ticketSchema.pre('findOneAndDelete', async function(next) {
    try {
        // Get the ticket that's about to be deleted
        const ticket = await this.model.findOne(this.getFilter());
        
        if (ticket) {
            // Import Event model dynamically to avoid circular dependency
            const Event = mongoose.model('Event');
            const event = await Event.findById(ticket.eventTitle);
            
            if (event) {
                event.ticketsAvailable += ticket.numberTickets;
                await event.save();
                console.log(`[Ticket Middleware] Restored ${ticket.numberTickets} tickets to event: ${event.title}`);
            }
        }
        next();
    } catch (error) {
        console.error('[Ticket Middleware] Error restoring tickets:', error);
        next(error);
    }
});

// Middleware for bulk deletions (deleteMany)
// This handles when multiple tickets are deleted (e.g., user deletion)
ticketSchema.pre('deleteMany', async function(next) {
    try {
        // Get all tickets that match the filter
        const tickets = await this.model.find(this.getFilter());
        
        if (tickets.length > 0) {
            // Import Event model dynamically
            const Event = mongoose.model('Event');
            
            // Group tickets by event to optimize updates
            const eventTicketCounts = {};
            
            for (const ticket of tickets) {
                const eventId = ticket.eventTitle.toString();
                eventTicketCounts[eventId] = (eventTicketCounts[eventId] || 0) + ticket.numberTickets;
            }
            
            // Update each event's available tickets
            for (const [eventId, ticketCount] of Object.entries(eventTicketCounts)) {
                const event = await Event.findById(eventId);
                if (event) {
                    event.ticketsAvailable += ticketCount;
                    await event.save();
                    console.log(`[Ticket Middleware] Restored ${ticketCount} tickets to event: ${event.title}`);
                }
            }
        }
        next();
    } catch (error) {
        console.error('[Ticket Middleware] Error restoring tickets:', error);
        next(error);
    }
});

export default mongoose.model('Ticket', ticketSchema);