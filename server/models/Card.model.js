const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cardSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    cardContent: {
        type: String,
        maxlength: 140,
        required : true
    },
    cardTags: {
        type: [String],
        default: ['Misc']
    },
    cardDate: Date
});

const Card = mongoose.model("Card", cardSchema)
module.exports = Card