const mongoose = require('mongoose')
 
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)


// mongoose.connect('mongodb://localhost:27017/CAMP-GROUND', {useNewUrlParser: true})
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', ()=>{
//     console.log('Database connected');
// });