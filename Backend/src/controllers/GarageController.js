const garageModel = require("../models/GarageModel")
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");

//storage engine

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

const addGarage = async (req,res) => {
  
    try{
        const savedgarage = await garageModel.create(req.body)
        res.status(201).json({
            message:"garage added sucessfully",
            data:savedgarage
            
        })
    } catch(err){
        res.status(500).json({
            message:err
        })
    }

}

const getAllGarages = async (req,res) => {
    try{
        const garages = await garageModel.find().populate("stateId").populate("cityId").populate("areaId").populate("userId", "firstname roleId status email")
        res.status(200).json({
            message:"All Garages",
            data:garages 
        })
    } catch(err){
        res.status(500).json({
            message:err
        })
    }
}
const getAllGaragesByUserId = async (req,res) => {
    try{
        const garages = await garageModel.find({userId:req.params.userId}).populate("stateId cityId areaId userId")
        res.status(200).json({
            message:"Garages founded..",
            data:garages 
        })
    } catch(err){
        res.status(500).json({
            message:err
        }) 
    }
}

const deleteGarageById = async (req,res) => {
    try{
        const deletedgarage = await garageModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "garage deleted..",
            data: deletedgarage
        })

    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getGarageById = async (req, res) => {
    try{
        const garage = await garageModel.findById(req.params.id).populate("stateId", "name")
        .populate("cityId", "name")
        .populate("areaId", "name")
        .populate("userId", "firstname email roleId status");
        
        if(!garage){res.status(404).json({message:"garage not found"})}
        res.status(200).json({
            message:"garage found",
            data:garage
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


const updateGarageById = async (req, res) => {
    try{
        const updatedGarage = await garageModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            message:"garage updated successfully",
            data:updatedGarage
            
        })

    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}



// const addGarageWithFile = async (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(500).json({
//                 message: err.message
//             });
//         } else {
//             //database data store
//             //cloudinary
//             console.log(req.body);
//             res.status(200).json({
//                 message: "File uploaded successfully",
//                 data:req.file,
//             }) 
//         }
//     })
// } 

const addGarageWithFile = async (req, res) => {
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
        req.body.garageURL = cloudinaryResponse.secure_url
        const savedgarage = await garageModel.create(req.body);

        res.status(200).json({
            message:"garage saved successfully",
            data: savedgarage
        })
        
      }
    })
}



const approveGarage = async (req, res) => {
    try {
      const updatedGarage = await garageModel.findByIdAndUpdate(
        req.params.id,
        { avaliability_status: true },
        { new: true }
      );
  
      res.status(200).json({
        message: "Garage approved successfully",
        data: updatedGarage
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  };


  const getApprovedGarages = async (req, res) => {
    try {
      const garages = await garageModel.find({ avaliability_status: true }).populate("stateId", "name")
      .populate("cityId", "name")
      .populate("areaId", "name")
      .populate("userId", "firstname email roleId status");

      res.status(200).json({
        message: "Approved garages only",
        data: garages
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  };
  


module.exports = {
    addGarage,getAllGarages,deleteGarageById,addGarageWithFile,getAllGaragesByUserId,updateGarageById,getGarageById,approveGarage, getApprovedGarages
}