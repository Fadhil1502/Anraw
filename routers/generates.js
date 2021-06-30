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
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        color4: req.body.color4,
        color5: req.body.color5,
        color6: req.body.color6,
        color7: req.body.color7,
        amount: req.body.amount
    })

    try{
        const newColor = await generate.save()
        res.redirect('/save/' + generate.id)
    }
    catch{
        res.render('generate', {
            generate: generate,
            errorMessage: 'Error creating color'
        })
    }
})

module.exports = router