import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String,  unique: true },
    interactions: [
        {
            question: { type: String, required: true },
            response: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;