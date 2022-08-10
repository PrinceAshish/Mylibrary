const mongoose = require('mongoose')

 
const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createDate : {
        type: Date,
        required: true,
        default: Date.now()
    },
    coverImg :{
        type: Buffer,
        required: true
    },
    coverImgType:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }       
})

BookSchema.virtual('coverImgPath').get(function(){
    if(this.coverImg != null && this.coverImgType != null ){
        return `data:${this.coverImgType};charaset=utf-8;base64,${this.coverImg.toString('base64')}`
    }    
})
module.exports = mongoose.model('Book', BookSchema)