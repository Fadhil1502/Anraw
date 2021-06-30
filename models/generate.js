const mongoose = require('mongoose')

const generateSchema = new mongoose.Schema({
    color1: {
        type: String,
        required: true,
        default: "#ff9900"
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
        type: String,
        required: true,
        default: "Created by Human"
    },
    creator: {
        type: String,
        required: true,
        default: "Human"
    },
    allowSave: {
        type: Boolean,
        default: false
    },
    allowQuickSave: {
        type: Boolean,
        default: false
    },
    linkFacebook: {
        type: Boolean,
        default: false
    },
    linkInstagram: {
        type: Boolean,
        default: false
    },
    linkTwitter: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    saves: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Generate', generateSchema)