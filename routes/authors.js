const { query } = require('express');
const express = require('express')
const router = express.Router();
const Author = require('../models/Author')

// All authors routes
router.get('/',async (req,res)=>{
    let searchOption ={};
    if(req.query.name != null && req.query.name !== null) {
        searchOption.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOption)
        res.render("authors/index", {authors, boxName: req.query})
    }catch{
        res.redirect('/')
    }
    
})

// new author routes
router.get('/new',(req,res)=>{
    res.render('authors/new' , {author: new Author() })
})
// create author routes
router.post('/', async (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect('authors')
    } catch{
        res.render('authors/new',{
                author: author,
                errorMessage: "Error creating new Author"
            })
    }    
})

module.exports = router;