const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// New Save Setup
router.get('/:id', async (req, res) => {
    try{
        const generate = await Generate.findById(req.params.id)
        res.render('save/index', { generate: generate })
    }
    catch{
        res.redirect('/')
    }
})

module.exports = router