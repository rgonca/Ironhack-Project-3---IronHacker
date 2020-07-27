const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Card'},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        // required: true
    },
    createdAt: {
        type: String,
        default: Date.now
    }
});

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment