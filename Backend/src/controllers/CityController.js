const cityModel = require("../models/CityModel")

const addCity = async (req,res) => {
    
    try{
        const savedCity = await cityModel.create(req.body);

        res.status(201).json({
            message:"City added successfully",
            data: savedCity
        })

    } catch(err){
        res.status(500).json({
            message:err
        })
    }
}


const getCities = async (req,res) => {
    try{
        const cities = await cityModel.find().populate("stateId")

        res.status(200).json({
            message:"All cities",
            data: cities
        })

    } catch(err){
        res.status(500).json({
            message:err
        })
    }
}
 
const getCityByStateId = async (req,res) => {
  
    try{
        const cities = await cityModel.find({ stateId: req.params.stateId })
        res.status(200).json({
            message:"cities found",
            data: cities
        })
    } catch(err){
        res.status(500).json({
            message:"city not found"
        })
    }
}

const deleteCityById = async (req, res) => {
    try{
        const deletedcity = await cityModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "city deleted..",
            data: deletedcity
        })

    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}



module.exports = {
    addCity,getCities,getCityByStateId,deleteCityById
}  