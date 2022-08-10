const express = require('express')
const router = express.Router();
const Book = require('../models/Book')
const Author = require('../models/Author')
const imgType = ['image/jpeg','image/png','image/gif']


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
router.post('/',  async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
   })  
   SaveCover(book, req.body.cover)
   try{
    const newBook = await book.save()
    res.redirect('Book')
   }catch(e){
    console.log(e)
    res.redirect('Book/new')
}  
})


function SaveCover(book, coverEncoded){
    if( coverEncoded == null ) return
    const cover = JSON.parse(coverEncoded)
    if(cover != null && imgType.includes(cover.type)){
        book.coverImg = new Buffer.from(cover.data, 'base64' )
        book.coverImgType = cover.type
    }

}
module.exports = router;