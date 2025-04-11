const mongoose = require("mongoose")
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    serviceId: [{
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
    }],
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    garageownerId: {
        type: Schema.Types.ObjectId,
        ref: "garages",
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "booked", "cancelled", "rejected", "completed", "inProgress", "rescheduled"],
        default: "pending"
    },
    reason: {
        type: String,
        default: null
    },
    vehicleStatus: {
        type: String,
        enum: ["ingarage", "returned"],
        default: null
    },
    isPaid: { type: Boolean, default: false },
    wasRejected: { type: Boolean, default: false },
}, {
    timestamps: true
})


module.exports = mongoose.model("Appointment", appointmentSchema)