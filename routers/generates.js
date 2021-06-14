const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// New Color Setup
router.get('/', (req, res) => {
    res.render('generate/index', { generate: new Generate() })
})

// New Color Create
router.post('/', async (req, res) => {
    const generate = new Generate({
        mainColor: req.body.mainColor,
        amount: req.body.amount,
        title: "Create by Human",
        creator: "Human",
        allowSave: false,
        allowQuickSave: false,
        linkFacebook: false,
        linkInstagram: false,
        linkTwitter: false
    })
    try{
        const newColor = await generate.save()
        res.redirect('/save')
    }
    catch{
        res.render('generate', {
            generate: generate,
            errorMessage: 'Error creating color'
        })
    }
})

module.exports = router