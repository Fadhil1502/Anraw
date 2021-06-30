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

// REMOVE THIS AFTER USE
// New Post Delete
router.delete('/:id', async (req, res) => {
    let generate
    try{
        generate = await Generate.findById(req.params.id)
        await generate.remove()
        res.redirect('/gallery')
    }
    catch{
        if(generate == null){
            res.redirect('/')
        }
        else{
            res.redirect('/gallery')
        }
    }
})

module.exports = router