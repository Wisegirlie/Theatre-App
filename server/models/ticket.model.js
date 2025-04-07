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

export default mongoose.model('Ticket', ticketSchema);