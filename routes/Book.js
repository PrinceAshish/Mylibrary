const express = require('express')
const router = express.Router();
const Book = require('../models/Book')
const Author = require('../models/Author')
const multer = require('multer')
const fs = require("fs")
const path = require('path')
const uploadPath = path.join('public',Book.uploadImgBasePath)
const imgType = ['image/jpeg','image/png','image/gif']
const upload = multer({
    dest : uploadPath,
    fileFilter : (req,file,callback)=>{
        callback(null, imgType.includes(file.mimetype) )
    }
})

// All Book routes
router.get('/', async (req,res)=>{
    let query = Book.find()
    if(req.query.title != null && req.query.title != ""){
        query = query.regex('title',new RegExp(req.query.title ,'i'))
    }
    if(req.query.publishBefore != null && req.query.publishBefore != ""){
        query = query.lte('publishBefore', req.query.publishBefore)
    }
    if(req.query.publishAfter != null && req.query.publishAfter != ""){
        query = query.gte('publipublishAftershBefore', req.query.publishAfter)
    }
    try{
        const books = await query.exec()
        res.render('Books/index',{
        books: books,
        boxName : req.query
       })

    }catch(e){
        console.log(e);
        res.redirect("/")
    }
   
})

// new Book routes
router.get('/new', async (req,res)=>{
 try{
    const authors = await Author.find({})
    const book = new Book()
    res.render('Books/new',{authors, book})
 }catch{
    res.redirect('Book')
 }
})
// create Book routes
router.post('/', upload.single('cover'), async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImgName: fileName,
    description: req.body.description
   })  
   try{
    const newBook = await book.save()
    res.redirect('Book')
   }catch(e){
    console.log(e)
    if(book.coverImgName != null){
        removeBackCover(book.coverImgName)
    }
    res.redirect('Book/new')
}  
})

function removeBackCover(fileName) {
    fs.unlink(uploadPath, fileName), err =>{
        if(err) console.error(err)
    }
}

module.exports = router;