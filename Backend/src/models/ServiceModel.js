const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name:{
        type:String,
        enum:["Oil Change", "Brake Repair", "Battery Replacement", "Wheel Alignment", "General Service", "AC Repair", "Tire Change", "Engine Tuning", "Car Wash", "Suspension Repair"],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    allInclusivePrice:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:["two wheeler" , "three Wheeler", "Four Wheeler"],
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    availability:{
        type:Boolean,
        default:true
    },
    ratings:{
        type:Number
    },
    serviceURL:{
        type:String,
        required:true
    },
    garageId: {
        type: Schema.Types.ObjectId,
        ref: "garages",
        required: true
    }
    

},{
    timestamps:true
})

module.exports = mongoose.model("Service",serviceSchema)