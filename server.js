if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
// All Declration here
const express = require('express')
const app = express(); 
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

// mongoDB connection here
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log('Database connected');
});

// All Routes decration here
const IndexRouter = require('./routes/index')
const AuthorRouter = require('./routes/Author')
const BookRouter = require('./routes/Book')

// All Express use and set here
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

// All routes connect here
app.use("/", IndexRouter)
// app.use("/authors", AuthorRouter)
app.use("/Book", BookRouter)


// App running on port here
app.listen(process.env.PORT ||  3000,()=>{
    console.log("i am Listing 3000")
})