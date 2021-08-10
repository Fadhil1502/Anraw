const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// All Color
router.get('/', async (req, res) => {
    let searchData = Generate.find()
    let generate
    const dateNow = new Date()
    if(req.query.creator != null && req.query.creator !== ''){
        searchData = searchData.regex('creator', new RegExp(req.query.creator, 'i'))
    }
    if(req.query.title != null && req.query.title !== ''){
        searchData = searchData.regex('title', new RegExp(req.query.title, 'i'))
    }
    try{
        generate = await searchData.sort({ dateCreated: 'desc' }).exec()
        res.render('gallery/index', { 
            generate: generate,
            searchData: req.query,
            page: 'Gallery - '
        })
    }
    catch{
        res.redirect('/')
    }
})

// REMOVE THIS AFTER USE
// Delete Post
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