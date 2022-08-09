const mongoose = require('mongoose')
const path = require('path')
const uploadImgBasePath = 'uploads/Bookcovers'
 
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
    coverImgName :{
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
    if(this.coverImgName != null){
        return path.join('/', uploadImgBasePath, this.coverImgName)
    }    
})
module.exports = mongoose.model('Book', BookSchema)
module.exports.uploadImgBasePath = uploadImgBasePath