const routes = require("express").Router()

const areaController = require("../controllers/AreaController")

routes.post("/addarea", areaController.addArea)
routes.get("/getareas", areaController.getAreas)
routes.get("/getareabycity/:cityId", areaController.getAreaByCityId)
routes.delete("/deletearea/:id", areaController.deleteAreaById)

module.exports = routes 