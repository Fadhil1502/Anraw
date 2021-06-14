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
        type: String,
    },
    color3: {
        type: String,
    },
    color4: {
        type: String,
    },
    color5: {
        type: String,
    },
    color6: {
        type: String,
    }
})

module.exports = mongoose.model('Generate', generateSchema)