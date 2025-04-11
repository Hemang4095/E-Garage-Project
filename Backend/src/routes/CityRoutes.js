const routes = require("express").Router()

const cityController = require("../controllers/CityController")

routes.post("/addcity", cityController.addCity)
routes.get("/getcities", cityController.getCities)
routes.get("/getcitybystate/:stateId", cityController.getCityByStateId)
routes.delete("/deletecity/:id",cityController.deleteCityById)

module.exports = routes
