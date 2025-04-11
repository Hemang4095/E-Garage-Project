const roleModel = require("../models/RoleModel")
//rolemodel == roles

const getAllRoles = async (req, res) => {
    try {

        const roles = await roleModel.find()  //[{}]

        res.status(200).json({
            message: "role fetched Sucessfully",
            data: roles
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}


const addRole = async (req, res) => {
    //req.body,req.params,req.headers,req.query
    //console.log("request body...",req.body)
    // add into roles() values()
    //database..
    try {

        const savedRole = await roleModel.create(req.body)

        res.status(201).json({
            message: "role created...",
            data: savedRole

        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

const deleteRole = async (req, res) => {
    //delete from roles where id is ?
    //req.params
    //console.log(req.params.id) //params object
    try {

        const deletedRole = await roleModel.findByIdAndDelete(req.params.id)

        //this is not done is real projects it not make good iso 
        res.status(200).json({
            message: "role deleted sucessfully...",
            data: deletedRole

        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

const getRoleById = async (req, res) => {
    try {

        const foundRole = await roleModel.findById(req.params.id)

        res.status(200).json({
            message: "role fetched...",
            data: foundRole

        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}




module.exports = {
    getAllRoles, addRole, deleteRole, getRoleById
}