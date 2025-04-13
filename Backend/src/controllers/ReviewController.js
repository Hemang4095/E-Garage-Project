const mongoose = require("mongoose")
const reviewModel = require("../models/ReviewModel");




// Get All Reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find()
            .populate("userId", "firstname email")
            .populate("garageId", "name")

        res.status(200).json({
            message: "All reviews fetched successfully",
            data: reviews
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get Reviews By Garage
const getReviewsByGarage = async (req, res) => {
    try {
        const {garageId} = req.params;
        const reviews = await reviewModel.find({ garageId })
            .populate("garageId","name")
            .populate("userId", "firstname userURL email")
            .sort({createdAt:-1});
        res.status(200).json({
            message: "Garage reviews fetched successfully",
            data: reviews
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get Reviews By Service
const getReviewsByService = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ serviceId: req.params.serviceId })
            .populate("userId", "firstname email")
            .populate("garageId", "name");
        res.status(200).json({
            message: "Service reviews fetched successfully",
            data: reviews
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Delete Review
const deleteReviewById = async (req, res) => {
    try {
        const deletedReview = await reviewModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Review deleted successfully",
            data: deletedReview
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createReview = async (req, res) => {
    try {
      const { userId, rating, comment } = req.body;
      const { garageId } = req.params;
  
      // Validate input
      if (!userId || !garageId || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
     
      const review = await reviewModel.create({
        userId,
        garageId,
        rating,
        comment,
      });
  
      res.status(201).json({
        message: "Review added successfully",
        review,
      });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Failed to add review" });
    }
  };
  


const getAverageRating = async (req, res) => {
    const { garageId } = req.params;
    try {
      const result = await reviewModel.aggregate([
        { $match: { garageId: new mongoose.Types.ObjectId(garageId) } },
        {
          $group: {
            _id: "$garageId",
            averageRating: { $avg: "$rating" },
            count: { $sum: 1 }
          }
        }
      ]);
  
      if (result.length > 0) {
        res.json({ average: result[0].averageRating, count: result[0].count });
      } else {
        res.json({ average: 0, count: 0 });
      }
    } catch (error) {
      console.error("Error getting average rating:", error);
      res.status(500).json({ error: "Failed to calculate average rating" });
    }
  };
  
  



module.exports = {
    getAllReviews,
    getReviewsByGarage,
    getReviewsByService,
    deleteReviewById,
    createReview,
    getAverageRating
};
