const express = require('express')
const router = express.Router()

// Public Relation Home
router.get('/', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation - ', PRContent: 'service' })
})

// Give Home
router.get('/give', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Give - ', PRContent: 'give' })
})

// Email Message
router.get('/give/message', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Give Message - ', PRContent: 'form', formSubject: 'Message' })
})

// Email Review
router.get('/give/review', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Give Review - ', PRContent: 'form', formSubject: 'Review' })
})

// Email Suggestion
router.get('/give/suggestion', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Give Suggestion - ', PRContent: 'form', formSubject: 'Suggestion' })
})

// Contact Info
router.get('/contact', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Contact - ', PRContent: 'blog', blogSubject: 'Contact' })
})

// Donation Info
router.get('/donation', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Donation - ', PRContent: 'blog', blogSubject: 'Donation' })
})

// Version Info
router.get('/version', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Version - ', PRContent: 'blog', blogSubject: 'Version' })
})

// Version 1xx Info
router.get('/version/v1', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Version 1 - ', PRContent: 'blog', blogSubject: 'Version 1xx' })
})

// Report Home
router.get('/report', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Report - ', PRContent: 'report' })
})

// Report Bug
router.get('/report/bug', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Report Bug - ', PRContent: 'form', formSubject: 'Bug Report' })
})

// Report Disrespectful Language
router.get('/report/dl', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Report Disrespectful Language - ', PRContent: 'form', formSubject: 'Disrespectful Language Report' })
})

// Tutorial Home
router.get('/tutorial', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Tutorial - ', PRContent: 'tutorial' })
})

// Tutorial Generate
router.get('/tutorial/generate', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Tutorial Generate - ', PRContent: 'blog', blogSubject: 'How to Generate' })
})

// Redirect Generate
router.get('/tutorial/How%20to%20Generate', (req, res) => {
    res.redirect('../tutorial/save')
})

// Tutorial Save
router.get('/tutorial/save', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Tutorial Save - ', PRContent: 'blog', blogSubject: 'How to Save' })
})

// Redirect Save
router.get('/tutorial/How%20to%20Save', (req, res) => {
    res.redirect('../tutorial/post')
})

// Tutorial Post
router.get('/tutorial/post', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Tutorial Post - ', PRContent: 'blog', blogSubject: 'How to Post' })
})

// Redirect Post
router.get('/tutorial/How%20to%20Post', (req, res) => {
    res.redirect('../tutorial/gallery')
})

// Tutorial Gallery
router.get('/tutorial/gallery', (req, res) => {
    res.render('publicRelation/index', { page: 'Public Relation | Tutorial Gallery - ', PRContent: 'blog', blogSubject: 'How to Gallery' })
})

module.exports = router