const routes = require("express").Router() 

const userController = require("../controllers/UserController")

routes.get("/users", userController.getAllUsers)
// routes.post("/user", userController.addUsers)
routes.post("/user", userController.signup)
routes.delete("/user/:id", userController.deleteUsers)
routes.get("/user/:id", userController.getUserById) 
routes.post("/user/login", userController.loginUser)
routes.post("/user/forgetpassword", userController.forgotPassword)
routes.post("/user/resetpassword", userController.resetpassword)
routes.post("/addwithfile", userController.addUserWithFile)
routes.put("/updateuserby/:id", userController.updateUserById)
routes.put("/toggle-userstatus/:id", userController.toggleUserStatus)



module.exports = routes