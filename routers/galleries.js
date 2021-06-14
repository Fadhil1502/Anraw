const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// All Color
router.get('/', async (req, res) => {
    try{
        const generate = await Generate.find({})
        res.render('gallery/index', { generate: generate })
    }
    catch{
        res.redirect('/')
    }
})

module.exports = router