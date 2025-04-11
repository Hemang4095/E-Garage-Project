//model --> controller --> Routes --> app.js

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    age:{
        type:Number
    },
    contactno:{ 
        type:String 
    },
    status:{
        type:Boolean,
        default:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    password:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    userURL:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose.model("users", userSchema)



