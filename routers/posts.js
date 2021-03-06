const express = require('express')
const router = express.Router()
const Generate = require('../models/generate')

// Redirect
router.get('/', (req, res) => {
    res.redirect('/generate')
})

// Post Setup
router.get('/:id', async (req, res) => {
    try{
        const generate = await Generate.findById(req.params.id)
        if(generate == null){
            res.render('save/new', { generate: null, page: 'Post - ' })
        }
        else if(generate.posted){
            res.render('post/posted', { generate: generate, page: 'Post - ' })
        }
        else{
            res.render('post/index', { generate: generate, page: 'Post | ' + req.params.id + ' - ' })
        }
    }
    catch{
        res.redirect('/')
    }
})

// Create New Post
router.put('/:id', async (req, res) => {
    let generate
    try{
        generate = await Generate.findById(req.params.id)
        generate.title = req.body.title
        generate.creator = req.body.creator
        generate.allowSave = req.body.allowSave
        generate.allowQuickSave = req.body.allowQuickSave
        generate.linkInstagram = req.body.linkInstagram
        if(req.body.accountInstagram.includes('@')){
            generate.accountInstagram = req.body.accountInstagram.split('@')[1]
        }
        else{
            generate.accountInstagram = req.body.accountInstagram
        }
        generate.posted = true;
        await generate.save()
        res.redirect('/gallery')
    }
    catch{
        if(generate == null){
            res.redirect('/')
        }
        else{
            res.render('post', {
                generate: generate,
                errorMessage: 'Error posting color'
            })
        }
    }
})

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
            res.redirect('/post/'+generate.id)
        }
    }
})

module.exports = router