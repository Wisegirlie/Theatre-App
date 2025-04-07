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
},
{timestamps: true});

export default mongoose.model('Event', eventSchema);