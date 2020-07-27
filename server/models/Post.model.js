const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        enum: ['WebDev', 'UXUI', 'Data', 'Jobs', 'Projects', 'Offers', 'Requests', 'Misc'],
        default: 'Misc'
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    comments: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    }
});

const Card = mongoose.model("Card", postSchema)
module.exports = Card