const multer = require("multer");
const serviceModel = require("../models/ServiceModel");
const cloudinaryUtil = require("../utils/CloudanryUtil");
const path = require("path");



const storage = multer.diskStorage({
    destination:"./uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//multer object...

const upload = multer({
    storage: storage,
    //fileFilter:
}).single("image");

const getAllServices = async (req,res) => {
    try{
        const services = await serviceModel.find().populate("userId")
        res.status(200).json({
            message:"services get Successfully",
            data: services
        })
    } catch(err) {
        res.status(500).json({
            message:err.message 
        })
    }
}

const addServices = async (req,res) => {
    try{
        const savedServices = await serviceModel.create(req.body)
        res.status(201).json({
            message:"services added sucessfully",
            data:savedServices
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteServiceById = async (req,res) => {
    try{
        const deletedservice = await serviceModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Service deleted..",
            data:deletedservice
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getServiceById = async (req,res) => {
    try{
        const service = await serviceModel.findById(req.params.id).populate("userId")
        if(!service){res.status(404).json({message:"service not found"})}
        res.status(200).json({
            message:"service founded..",
            data:service
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}


const addServiceWithFile = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        res.status(500).json({
            message: err.message
        })
      } else {
        //database data store
        //cloudinary

        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file)
        console.log(cloudinaryResponse);
        console.log(req.body);
        
        //store data in database
        req.body.serviceURL = cloudinaryResponse.secure_url
        const savedservice = await serviceModel.create(req.body);

        res.status(200).json({
            message:"garage saved successfully",
            data: savedservice
        })
        
      }
    })
}


const getAllServicesByUserId = async (req,res) => {
    try{
        const services = await serviceModel.find({userId:req.params.userId}).populate("userId")
        res.status(200).json({
            message:"Services founded..",
            data:services 
        })
    } catch(err){
        res.status(500).json({
            message:err
        })
    }
} 

const updateServiceById = async (req, res) => {
    try{
        const updatedService = await serviceModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
                res.status(200).json({
                    message:"service updated successfully",
                    data:updatedService
                    
                })
    } catch(err) {
        res.status(500).json({
            message: err
        })
    }
}


const getServicesByGarageId = async (req, res) => {
    try {
        const services = await serviceModel.find({ garageId: req.params.garageId }).populate("userId").populate("garageId");
        res.status(200).json({
            message: "Services for the garage fetched successfully",
            data: services
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};




module.exports = {
    getAllServices,addServices,deleteServiceById,getServiceById,addServiceWithFile,getAllServicesByUserId, updateServiceById, getServicesByGarageId
}
