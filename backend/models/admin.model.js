const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
mongoose.plugin(mongooseUniqueValidator);

const adminSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
})
module.exports = mongoose.model("admin", adminSchema);