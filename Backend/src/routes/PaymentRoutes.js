const router = require("express").Router();

const paymentController = require("../controllers/PaymentController");

router.post("/create_order", paymentController.create_order);
router.post("/verify_order", paymentController.verify_order);
router.get("/getpaymentbyappointmentid/:appointmentId", paymentController.getPaymentByAppointmentId)
router.get("/getpaymentbyuserid/:userId", paymentController.getPaymentsByUserId)
router.get("/getkey", paymentController.getRazorpayKey)
router.get("/getallpayments", paymentController.getAllPayments)
router.get("/getrevenuechartdata", paymentController.getRevenueChartData)
router.get("/gettotalrevenue", paymentController.getTotalRevenue) 
router.get("/getgarageownerpayments/:garageOwnerId", paymentController.getGarageOwnerPayments)

module.exports = router; 