const express = require("express")  //express..
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors()) //*
app.use(express.json())  //to accept  data as json

require('dotenv').config();


const mailRoutes = require("./src/routes/mail"); // make sure the path is correct
app.use("/mail", mailRoutes); 

const contactRoutes = require("./src/routes/contactus");
app.use("/contact", contactRoutes);


//import roleRoutes
const roleRoutes = require("./src/routes/RoleRoutes") 
app.use(roleRoutes)

//import userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

//import stateRoutes
const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

//import cityRoutes
const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city", cityRoutes)

//import areaRoutes
const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area", areaRoutes)

//import garageRoutes
const garageRoutes = require("./src/routes/GarageRoutes")
app.use("/garage", garageRoutes)


//import serviceRoutes
const serviceRoutes = require("./src/routes/ServiceRoutes")
app.use("/service", serviceRoutes)

//import vehicleRoutes
const vehicleRoutes = require("./src/routes/VehicleRoutes")
app.use("/vehicle", vehicleRoutes)

//import appointmentRoutes
const appointmentRoutes = require("./src/routes/AppointmentRoutes")
app.use("/appointment", appointmentRoutes)

const paymentRoutes = require("./src/routes/PaymentRoutes")
app.use("/payment", paymentRoutes)

const reviewRoutes = require("./src/routes/ReviewRoutes")
app.use("/review", reviewRoutes)



mongoose.connect("mongodb://localhost:27017/25_node_internship").then(() => {
  console.log("database connected...")
}
)



//server creation
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server Started Sucessfully at port",PORT)
}
)