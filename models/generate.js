const mongoose = require('mongoose')

const generateSchema = new mongoose.Schema({
    mainColor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
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
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    allowSave: {
        type: Boolean,
        required: true
    },
    allowQuickSave: {
        type: Boolean,
        required: true
    },
    linkFacebook: {
        type: Boolean,
        required: true
    },
    linkInstagram: {
        type: Boolean,
        required: true
    },
    linkTwitter: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Generate', generateSchema)