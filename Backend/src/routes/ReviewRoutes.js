const express = require("express");
const routes = express.Router();
const reviewController = require("../controllers/ReviewController");

routes.get("/getallreviews", reviewController.getAllReviews);
routes.get("/getreviewbygarage/:garageId", reviewController.getReviewsByGarage);
routes.get("/getreviewbyservice/:serviceId", reviewController.getReviewsByService);
routes.delete("/deletereviewby/:id", reviewController.deleteReviewById);
routes.post("/addreview/:garageId", reviewController.createReview)
routes.get("/averagereview/:garageId", reviewController.getAverageRating)
routes.put("/updatereview/:reviewId", reviewController.updateReview)
routes.delete("/deletereviewbyuser/:reviewId", reviewController.deleteReviewByUserId)


module.exports = routes;
