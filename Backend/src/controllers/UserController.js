const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudanryUtil");
const secret = "secret";



const storage = multer.diskStorage({
    destination:"./uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: storage,
    //fileFilter:
}).single("image");


const getAllUsers = async (req, res) => {
    try {

        const users = await userModel.find().populate("roleId", "name -_id")
        const filteredUsers = users.filter(user => user.roleId.name !== "admin"); 
        res.status(200).json({
            message: "users fetched Sucessfully",
            data: filteredUsers
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

const loginUser = async (req, res) => {
    //password --> plain --> db --> encrypted
    //bcrypt -->plain,enc --> match :true
    const email = req.body.email
    const password = req.body.password
    //select * from users where email =? and password =? ( in sql)
    //userModel.find({email:email,password:password})
    //email --> object -->abc -->{password:hasedPassword}
    //normal password compare -->

    //const foundUserFromEmail = await userModel.findOne({email:req.body.email})
    const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")  //findone because we take unique in email
    console.log(foundUserFromEmail);

    //check if email is exist or not
    if (foundUserFromEmail != null) {
        //password
        //normal -plain req.body ---- database --> match --> true | false
        //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password  )
        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
        //true/false
        if (isMatch == true) {
            res.status(200).json({
                message: "login sucess..",
                data: foundUserFromEmail
            })

        } else {
            res.status(404).json({
                message: "Invalid cred.."
            })
        }

    } else {
        res.status(404).json({
            message: "Email not found."
        })
    }

}


const signup = async (req, res) => {

    //try and catch if else
    try {
        //password encrypt...
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createdUsers = await userModel.create(req.body)

        //send mail to user...
        //const mailResponse = await mailUtil.sendingMail(createdUsers.email,"welcome to E-garage platform","this is welcome mail do not replay")
        await mailUtil.sendingMail(createdUsers.email, "welcome to E-garage platform", "this is welcome mail do not replay")

        res.status(201).json({
            message: "users created...",
            data: createdUsers
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "error",
            data: err
        })
    }


}


const addUsers = async (req, res) => {

    try {

        const savedUsers = await userModel.create(req.body)

        res.status(201).json({
            message: "users saved Sucessfully",
            data: savedUsers
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

const deleteUsers = async (req, res) => {

    try {

        const deletedUsers = await userModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "user deleted..",
            data: deletedUsers
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

const getUserById = async (req, res) => {

    try {

        const foundUser = await userModel.findById(req.params.id)

        res.status(200).json({
            message: "user founded..",
            data: {
                _id: foundUser._id,
                firstname: foundUser.firstname,
                image: foundUser.userURL,
                createdAt: foundUser.createdAt,
                email: foundUser.email,
                contactno: foundUser.contactno

            }
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}


const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const foundUser = await userModel.findOne({email: email})

    if (foundUser) {
        const token = jwt.sign(foundUser.toObject(), secret)
        console.log(token);
        const url = `http://localhost:5173/resetpassword/${token}`
        const mailContent = `<html><a href = "${url}">reset password</a>
        </html>`;

        //email
        await mailUtil.sendingMail(foundUser.email, "reset password", "",mailContent)
        res.json({
            message:"reset password link sent to mail"
        })

    } else{
        res.json({
            message:"user not found register first.."
        })
    }
}


const resetpassword = async (req, res) => {
    const token = req.body.token; //decode --> email|id
    const newPassword = req.body.password

    const userFromToken = jwt.verify(token, secret); 

    const salt = bcrypt.genSaltSync(10);
    const hasedPassword = bcrypt.hashSync(newPassword,salt)

    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
        password: hasedPassword
    })
    res.json({
        message: "password updated sucessfully.."
    })
}


const addUserWithFile = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      try {
        if (!req.file) {
          return res.status(400).json({ message: "File is required!" });
        }
  
        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        req.body.userURL = cloudinaryResponse.secure_url;
  
        // Hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
  
        // Store data in the database
        const savedUser = await userModel.create(req.body);
  
        res.status(200).json({
          message: "User registered successfully ✅",
          data: savedUser
        });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Internal Server Error ❌" });
        }
    });
  };


  const updateUserById = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      try {
        const userId = req.params.id;
        const { firstname, contactno } = req.body;
        let updatedData = { firstname, contactno };
  
        // If a new image is uploaded, store it in Cloudinary
        if (req.file) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
          updatedData.userURL = cloudinaryResponse.secure_url;
        }
  
        // Update the user data in the database
        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
  
        res.status(200).json({
          message: "User updated successfully",
          updatedUser,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  };
  


  const toggleUserStatus = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.status = !user.status;
        await user.save();

        res.status(200).json({ message: `User is now ${user.status ? "Active" : "Inactive"}` });
    } catch (error) {
        res.status(500).json({ message: "Error toggling status", error });
    }
};



module.exports = {
    getAllUsers, addUsers, deleteUsers, getUserById, signup, loginUser, forgotPassword, resetpassword, addUserWithFile,updateUserById, toggleUserStatus
}