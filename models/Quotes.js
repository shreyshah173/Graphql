import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);

export default Quote;
