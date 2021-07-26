const mongoose = require('mongoose')

const generateSchema = new mongoose.Schema({
    color1: {
        type: String,
        required: true,
        default: "#ff9500"
    },
    color2: {
        type: String
    },
    color3: {
        type: String
    },
    color4: {
        type: String
    },
    color5: {
        type: String
    },
    color6: {
        type: String
    },
    color7: {
        type: String
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    },
    title: {
        type: String
    },
    creator: {
        type: String
    },
    allowSave: {
        type: Boolean,
        default: true
    },
    allowQuickSave: {
        type: Boolean,
        default: true
    },
    linkInstagram: {
        type: Boolean,
        default: true
    },
    accountInstagram: {
        type: String
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    posted: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Generate', generateSchema)