const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    garageId: {
        type: Schema.Types.ObjectId,
        ref: "garages",
        required: true
    },
    // serviceId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Service",
    //     // required: true
    // },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);
