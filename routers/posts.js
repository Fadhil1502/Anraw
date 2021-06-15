const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// New Post Setup
router.get('/:id', async (req, res) => {
    try{
        const generate = await Generate.findById(req.params.id)
        res.render('post/index', { generate: generate })
    }
    catch{
        res.redirect('/')
    }
})

// New Post Create
router.put('/:id', async (req, res) => {
    let generate
    try{
        generate = await Generate.findById(req.params.id)
        generate.mainColor = generate.mainColor
        generate.amount = generate.amount
        generate.title = req.body.title
        generate.creator = req.body.creator
        generate.allowSave = req.body.allowSave
        generate.allowQuickSave = req.body.allowQuickSave
        generate.linkFacebook = req.body.linkFacebook
        generate.linkInstagram = req.body.linkInstagram
        generate.linkTwitter = req.body.linkTwitter
        await generate.save()
        res.redirect('/gallery')
    }
    catch{
        if(generate == null){
            res.redirect('/')
        }
        res.render('post', {
            generate: generate,
            errorMessage: 'Error posting color'
        })
    }
})

module.exports = router