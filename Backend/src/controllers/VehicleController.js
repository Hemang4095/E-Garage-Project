const vehicleModel = require("../models/VehicleModel")

const getAllVehicles = async (req,res) => {
    try{
        const vehicles = await vehicleModel.find().populate("userId")
        res.status(200).json({
            message:"Vehicles get Successfully",
            data: vehicles
        })
    } catch(err) {
        res.status(500).json({
            message:err.message 
        })
    }
}

const addVehicles = async (req,res) => {
    try{
        const savedVehicles = await vehicleModel.create(req.body)
        res.status(201).json({
            message:"Vehicles added sucessfully",
            data:savedVehicles
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteVehicleById = async (req,res) => {
    try{
        const deletedvehicle = await vehicleModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Vehicle deleted..",
            data:deletedvehicle
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getVehicleById = async (req,res) => {
    try{
        const vehicle = await vehicleModel.findById(req.params.id).populate("userId")
        if(!vehicle){res.status(404).json({message:"vehicle not found"})}
        res.status(200).json({
            message:"vehicle founded..",
            data:vehicle
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getVehicleByUserId = async (req,res) => {
    try{
        const vehicle = await vehicleModel.find({userId: req.params.userId})
        if(!vehicle){res.status(404).json({message:"vehicle not found"})}
        res.status(200).json({
            message:"vehicle is founded..",
            data:vehicle
        })

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}
 

module.exports = {
    getAllVehicles,addVehicles,deleteVehicleById,getVehicleById,getVehicleByUserId
}