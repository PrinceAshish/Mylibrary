if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require('express')
const app = express(); 
const expressLayouts = require("express-ejs-layouts")
const path = require('path')

const IndexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log('Database connected');
});


app.use("/", IndexRouter)

app.listen(process.env.PORT ||  3000,()=>{
    console.log("i am Listing 3000")
})