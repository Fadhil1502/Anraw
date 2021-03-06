const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

//Unknown Save
router.get('/', (req, res) => {
    res.render('save/new', { generate: null, page: 'Save - ' })
})

// Save Setup
router.get('/:id', async (req, res) => {
    try{
        const generate = await Generate.findById(req.params.id)
        res.render('save/index', { generate: generate, page: 'Save | ' + req.params.id + ' - ' })
    }
    catch{
        res.redirect('/')
    }
})

// Delete Palette
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
            res.redirect('/save/'+generate.id)
        }
    }
})

module.exports = router