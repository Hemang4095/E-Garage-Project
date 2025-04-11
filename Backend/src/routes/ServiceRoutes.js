const routes = require("express").Router()

const serviceController = require("../controllers/ServiceController")
const { route } = require("./UserRoutes")

routes.get("/getallservices", serviceController.getAllServices)
// routes.post("/addservice", serviceController.addServices)
routes.delete("/deleteservice/:id", serviceController.deleteServiceById)
routes.get("/getservice/:id", serviceController.getServiceById)
routes.post("/addwithfile", serviceController.addServiceWithFile)
routes.get("/getservicesbyuserid/:userId", serviceController.getAllServicesByUserId)
routes.put("/updateservice/:id", serviceController.updateServiceById)
routes.get("/getservices/:garageId", serviceController.getServicesByGarageId)

module.exports = routes