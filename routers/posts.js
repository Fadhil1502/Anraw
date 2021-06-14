const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// New Post Setup
router.get('/', (req, res) => {
    res.render('post/index', { generate: new Generate() })
})

// New Post Create
router.post('/', async (req, res) => {
    const generate = new Generate({
        mainColor: generate.mainColor,
        amount: generate.amount,
        title: req.body.title,
        creator: req.body.creator,
        allowSave: req.body.allowSave,
        allowQuickSave: req.body.allowQuickSave,
        linkFacebook: req.body.linkFacebook,
        linkInstagram: req.body.linkInstagram,
        linkTwitter: req.body.linkTwitter
    })
    try{
        const newPost = await generate.save()
        res.redirect('/gallery')
    }
    catch{
        res.render('generate', {
            generate: generate,
            errorMessage: 'Error creating color'
        })
    }
})

module.exports = router