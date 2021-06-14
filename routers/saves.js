const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// New Save Setup
router.get('/', (req, res) => {
    res.render('Save/index')
})

module.exports = router