const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        required : true
    },
    tags: {
        type: [String],
        enum: ['WebDev', 'UX/UI', 'Data', 'Jobs', 'Projects', 'Offers', 'Requests', 'Misc'],
        default: 'Misc'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [String],
    }
});

const Card = mongoose.model("Card", postSchema)
module.exports = Card