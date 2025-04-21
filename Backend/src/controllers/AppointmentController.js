const appointmentModel = require("../models/AppointmentModel")
const garageModel = require("../models/GarageModel")
const userModel = require("../models/UserModel"); 
const { sendingMail } = require("../utils/MailUtil");

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find().populate("userId serviceId vehicleId garageownerId", "name firstname model userId")
        res.status(200).json({
            message: "appointments get successfully..",
            data: appointments
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



const addAppointments = async (req, res) => {
    try {
      const savedAppointment = await appointmentModel.create(req.body);
  
      // Fetch the user's email based on userId from request
      const user = await userModel.findById(req.body.userId);
  
      if (user && user.email) {
        // Send confirmation email
        await sendingMail(
          user.email,
          "Appointment Confirmation - E-Garage",
          `Hello ${user.firstname || "Customer"},\n\nYour appointment has been booked successfully!\n\nWe'll notify you again once your service is completed.\n\nThank you for choosing E-Garage 🚗🔧`
        );
      }
  
      res.status(201).json({
        message: "Appointment saved successfully and confirmation email sent.",
        data: savedAppointment,
      });
    } catch (err) {
      console.error("Error in booking appointment:", err.message);
      res.status(500).json({
        message: err.message,
      });
    }
  };

const deleteAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const deletedAppointment = await appointmentModel.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({
            message: "Appointment deleted successfully",
            data: deletedAppointment,
        });
    } catch (err) {
        res.status(500).json({ 
            message: err.message 
        });
    }
}


const getAppointmentsById = async (req, res) => {
    try {
        const appointment = await appointmentModel.findById(req.params.id).populate("serviceId", "name allInclusivePrice")
        .populate("vehicleId", "model licensePlate make")
        .populate({

            path: "garageownerId",
            select: "name userId", // Get garage name & userId
            populate: {
                path: "userId", // Nested: garage owner
                select: "firstname email", // Get owner's name & email
            },
        }
        )
        .populate("userId", "firstname email");
        res.status(200).json({
            message: "Appointment founded..",
            data: appointment
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getAppointmentSByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const appointments = await appointmentModel.find({ userId }).populate("serviceId", "name allInclusivePrice")
            .populate("vehicleId", "model licensePlate make")
            .populate({

                path: "garageownerId",
                select: "name userId", // Get garage name & userId
                populate: {
                    path: "userId", // Nested: garage owner
                    select: "firstname email", // Get owner's name & email
                },
            }
            )
            .populate("userId", "firstname email");

        res.status(200).json({
            message: "Appointments fetched by user ID",
            data: appointments,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


const getAppointmentsByGarageownerUserId = async (req, res) => {
    try {
        const garageOwnerUserId = req.params.userId;

        const garages = await garageModel.find({ userId: garageOwnerUserId }).select("_id name");

        if (garages.length === 0) {
            return res.status(404).json({
                message: "No garages found for this user.",
                data: []
            });
        }

        const garageIds = garages.map(garage => garage._id);

        const appointments = await appointmentModel.find({ garageownerId: { $in: garageIds } })
            .populate("serviceId", "name allInclusivePrice")
            .populate("vehicleId", "model licensePlate make")
            .populate("userId", "firstname email")
            .populate("garageownerId", "name");

        res.status(200).json({
            message: "Appointments fetched successfully by garage owner's userId",
            data: appointments
        });


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}









const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointmentId = req.params.id;

        let updateFields = { status };

        if (status === "rejected") {
            updateFields.wasRejected = true;
        } else if (status === "pending") {
            updateFields.wasRejected = false;
        }

        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            updateFields,
            { new: true }
        )
        .populate("userId")
        .populate("garageownerId")
        .populate("serviceId")
        .populate("vehicleId");

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // 📧 Send bill email if completed
        if (status === "completed") {
            const to = updatedAppointment.userId.email;
            const services = updatedAppointment.serviceId.map(s => s.name).join(", ");
            const subject = "Your Vehicle Service is Completed!";
        
            const payUrl = `http://localhost:5173/user/myappointments`; // Replace with your actual URL
        
            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h2>Hello ${updatedAppointment.userId.firstname},</h2>
                    <p>Your service appointment is now <strong>completed</strong>.</p>
        
                    <h3>Vehicle Details:</h3>
                    <ul>
                        <li><strong>Make:</strong> ${updatedAppointment.vehicleId.make}</li>
                        <li><strong>Model:</strong> ${updatedAppointment.vehicleId.model}</li>
                        <li><strong>License Plate:</strong> ${updatedAppointment.vehicleId.licensePlate}</li>
                    </ul>
        
                    <h3>Service Details:</h3>
                    <p>${services}</p>
        
                    <p><strong>Total Price:</strong> ₹${updatedAppointment.finalPrice}</p>
                    
                    <a href="${payUrl}" style="
                        display: inline-block;
                        margin-top: 15px;
                        background-color: #28a745;
                        color: white;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    ">Pay Your Bill</a>
        
                    <p style="margin-top: 30px;">Thank you for using our platform!<br/>— E-Garage Team</p>
                </div>
            `;
        
            await sendingMail(to, subject,"", html);
        }
        

        res.status(200).json({
            message: "Appointment status updated successfully",
            data: updatedAppointment,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateVehicleReturnStatus = async (req, res) => {
  try {
    const { vehicleStatus } = req.body;
    const appointmentId = req.params.id;

    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { vehicleStatus },
      { new: true }
    )
      .populate("userId")
      .populate("vehicleId")
      .populate("garageownerId");

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ Send email if status is "returned"
    if (vehicleStatus === "returned") {
      const userEmail = updated.userId.email;
      const userName = updated.userId.firstname || "Customer";
      const vehicle = updated.vehicleId;
      const garageName = updated.garageownerId?.name || "Garage";
      const formattedDate = new Date(updated.appointmentDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const subject = "Your Vehicle Has Been Returned";
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2E86C1;">Hello ${userName},</h2>
          <p>Your vehicle has been successfully returned by <strong>${garageName}</strong>.</p>
          <h4>Appointment Details:</h4>
          <ul>
            <li><strong>Vehicle:</strong> ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})</li>
            <li><strong>Appointment Date:</strong> ${formattedDate}</li>
          </ul>
          <p>Thank you for choosing <strong>E-Garage</strong> for your service needs.</p>
          <p style="margin-top: 30px;">Warm regards,<br/><strong>E-Garage Team</strong></p>
        </div>
      `;

      await sendingMail(userEmail, subject, "", html);
    }

    res.status(200).json({
      message: "Vehicle status updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating vehicle return status:", err);
    res.status(500).json({ message: err.message });
  }
};
 







module.exports = {
    getAllAppointments, addAppointments, deleteAppointmentById, getAppointmentsById, getAppointmentSByUserId,getAppointmentsByGarageownerUserId, updateAppointmentStatus, updateVehicleReturnStatus
}