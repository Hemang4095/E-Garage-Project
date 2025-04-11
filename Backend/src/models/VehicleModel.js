const mongoose = require("mongoose")
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
      make:{
        type:String,
        enum:["Maruti", "Honda", "Kia", "Hyundai", "Toyota", "Ford", "Suzuki", "Yamaha", "Royal Enfield", "Tata", "BMW", "Mercedes", "Tesla"],
        required:true
      },
      model:{
        type:String,
        required:true
      },
      mfgYear:{
        type:Number,
        required:true
      },
      licensePlate:{
        type:String,
        unique:true,
        required:true
      },
      category:{
        type:String,
        enum:["two wheeler" , "three Wheeler", "Four Wheeler"],
        required:true
      },
      userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
      }
},{
    timestamps:true
})

module.exports = mongoose.model("Vehicle", vehicleSchema)