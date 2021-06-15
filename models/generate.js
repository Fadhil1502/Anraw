const mongoose = require('mongoose')

const generateSchema = new mongoose.Schema({
    mainColor: {
        type: String,
        required: true,
        default: "#ff9900"
    },
    amount: {
        type: Number,
        required: true,
        default: 1
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
        required: true,
        default: false
    },
    allowQuickSave: {
        type: Boolean,
        required: true,
        default: false
    },
    linkFacebook: {
        type: Boolean,
        required: true,
        default: false
    },
    linkInstagram: {
        type: Boolean,
        required: true,
        default: false
    },
    linkTwitter: {
        type: Boolean,
        required: true,
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