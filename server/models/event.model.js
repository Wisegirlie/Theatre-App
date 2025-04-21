import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    ticketsAvailable: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    venue: {
        type: String,
        required: false,
        trim: true,
    },
    eventDate: {
        type: Date,
        required: false,
        trim: false,
    },    
    ticketsSold: {
        type: Number,
        required: false,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    price: {
        type: Number,
        required: false,
        min: 0,
    },
},
{timestamps: true});

export default mongoose.model('Event', eventSchema);