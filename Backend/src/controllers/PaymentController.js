const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require("../models/PaymentModel");
const appointmentModel = require("../models/AppointmentModel");
const { sendingMail } = require("../utils/MailUtil");

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: "process.env.RAZORPAY_KEY",
  key_secret: "process.env.RAZORPAY_SECRET",
});

// 1️⃣ Create Order
const create_order = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  const options = {
    amount: amount , // paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err.message);
    res.status(500).json({ message: "Something went wrong while creating order" });
  }
};


const verify_order = async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
      userId,
      amount,
    } = req.body;
  
    const secret = razorpay.key_secret;
  
    const hash = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
  
    if (hash === razorpay_signature) {
      try {
        const newPayment = new paymentModel({
          appointmentId,
          userId,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount,
          status: "success",
        });
  
        await newPayment.save();
  
        // Update appointment isPaid
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
          appointmentId,
          { isPaid: true },
          { new: true }
        ).populate("userId","firstname email contactno");
  
        // 📨 Send payment success email
        const userEmail = updatedAppointment.userId.email;
        const userName = updatedAppointment.userId.firstname;
        await sendingMail(
            userEmail,
            "Payment Successful ✅",
            "",
            `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #0d6efd;">Payment Confirmation</h2>
              <p>Hi <strong>${userName}</strong>,</p>
          
              <p>We are pleased to inform you that your payment of <strong>₹${amount /100}</strong> for your appointment has been <span style="color: green;"><strong>successfully received</strong></span>.</p>
          
              <p>We truly appreciate your trust in our services. Our team will ensure your vehicle receives the best care at the scheduled time.</p>
          
              <hr style="margin: 20px 0;">
          
              <p style="margin-bottom: 5px;">📅 <strong>Appointment ID:</strong> ${appointmentId}</p>
              <p style="margin-bottom: 5px;">💳 <strong>Payment Amount:</strong> ₹${amount /100}</p>
              <p style="margin-bottom: 20px;">🕐 <strong>Status:</strong> Successful</p>
          
              <p>If you have any questions, feel free to reach out to our support team.</p>
          
              <p style="margin-top: 30px;">Thanks for choosing <strong>E-Garage</strong> 🚗🔧</p>
          
              <p style="font-size: 14px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
            `
          );
          
  
        res.status(200).json({ message: "Payment verified and saved successfully!" });
      } catch (err) {
        console.error("Payment saving error:", err.message);
        res.status(500).json({ message: "Payment verified but saving failed" });
      }
    } else {
      res.status(400).json({ status: "failure", message: "Invalid signature" });
    }
  };


  // Get payment details by appointment ID
const getPaymentByAppointmentId = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const payment = await paymentModel.findOne({ appointmentId }).populate("userId", "firstname email contactno");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found for this appointment" });
    }

    res.status(200).json({ data: payment });
  } catch (error) {
    console.error("Error fetching payment:", error.message);
    res.status(500).json({ message: "Server error fetching payment" });
  }
};



// const getPaymentsByUserId = async (req, res) => {
//   try {
//       const { userId } = req.params;

//       const payments = await paymentModel.find({ userId })
//           .populate("appointmentId")
//           .sort({ createdAt: -1 });

//       res.status(200).json({ success: true, data: payments });
//   } catch (error) {
//       console.error("Error fetching payments by user:", error);
//       res.status(500).json({ success: false, message: "Server error" });
//   }
// };


const getPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await paymentModel.find({ userId })
      .populate({
        path: "appointmentId",
        populate: [
          {
            path: "serviceId",
            model: "Service", // change if your model name is different
          },
          {
            path: "garageownerId",
            model: "garages", // your users model name (match your schema)
            select: "name", // only get the name field
          },
          {
            path: "vehicleId",
            model: "Vehicle", // optional, if you want vehicle info too
          }
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching payments by user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getRazorpayKey = (req, res) => {
  res.status(200).json({ key: razorpay.key_id });
};



module.exports = {
  create_order,
  verify_order,
  getPaymentByAppointmentId,
  getPaymentsByUserId,
  getRazorpayKey
};
