const routes = require("express").Router()

const vehicleController = require("../controllers/VehicleController")

routes.get("/getallvehicles", vehicleController.getAllVehicles)
routes.post("/addvehicle",vehicleController.addVehicles)
routes.get("/getvehicle/:id", vehicleController.getVehicleById)
routes.delete("/deletevehicle/:id", vehicleController.deleteVehicleById)
routes.get("/getvehicleBy/:userId", vehicleController.getVehicleByUserId)

module.exports = routes
 