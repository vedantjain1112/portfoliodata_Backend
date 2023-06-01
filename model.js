const mongoose = require('mongoose')
const DatabaseSchema = new mongoose.Schema({
    user_name : String,
    user_email : String,
    user_mobile : String,
    user_message : String,
    user_subject : String,
})

module.exports = mongoose.model("DatabaseSchema", DatabaseSchema)