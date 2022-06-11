const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId :{
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    likes : {
        type : Number,
        default : 0
    },
    usersLiked : {
        type : [mongoose.Types.ObjectId]
    },
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("post", postSchema)