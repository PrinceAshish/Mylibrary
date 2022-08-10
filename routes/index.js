const express = require('express')
const router = express.Router();
const Book = require('../models/Book')
// All authors routes
router.get('/', async (req,res)=>{
    let books 
    // console.log("you cam here")
   try{
    books = await Book.find().sort({createAT: 'desc'}).limit(10).exec()
   }
   catch(e){
    books =[e]
   }
   res.render('index', { books: books })
})


module.exports = router;