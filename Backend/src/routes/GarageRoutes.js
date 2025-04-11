const routes = require("express").Router()

const garageController = require("../controllers/GarageController")

routes.post("/addgarage", garageController.addGarage)
routes.get("/getallgarages", garageController.getAllGarages)
routes.delete("/deletegarage/:id", garageController.deleteGarageById)
routes.post("/addwithfile",garageController.addGarageWithFile)
routes.get("/getgaragesbyuserid/:userId", garageController.getAllGaragesByUserId)
routes.put("/updategarage/:id", garageController.updateGarageById)
routes.get("/getgarageby/:id", garageController.getGarageById) 
routes.put("/approvegarage/:id", garageController.approveGarage)
routes.get("/getApprovedGarages", garageController.getApprovedGarages)

module.exports = routes 