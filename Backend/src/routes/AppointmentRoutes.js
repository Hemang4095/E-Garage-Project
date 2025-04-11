const routes = require("express").Router()

const appointmentController = require("../controllers/AppointmentController")
const { route } = require("./RoleRoutes")

routes.get("/getallappointments", appointmentController.getAllAppointments)
routes.post("/addappointment", appointmentController.addAppointments)
routes.delete("/deleteappointment/:id", appointmentController.deleteAppointmentById)
routes.get("/getappointment/:id", appointmentController.getAppointmentsById)
routes.get("/getappointmentbyuserid/:userId",appointmentController.getAppointmentSByUserId)
routes.get("/getappointmentbygarageowneruserid/:userId", appointmentController.getAppointmentsByGarageownerUserId)
routes.put("/updateappointmentstatus/:id/status", appointmentController.updateAppointmentStatus)
routes.put("/updatevehiclereturnstatus/:id", appointmentController.updateVehicleReturnStatus)

module.exports = routes 