const cloudinary = require("cloudinary").v2;


const uploadFileToCloudinary = async (file) => {
    
    //config
    cloudinary.config({
        cloud_name:"dlfwgpfj2",
        api_key:"838723697367465",
        api_secret:"ffs1lGSCiccYwZ3d8rOJr72tdO0"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse
}

module.exports = {
    uploadFileToCloudinary
}
