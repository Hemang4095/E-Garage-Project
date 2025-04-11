# oauth --> Authentication | Authorization

- userFromemail --> object... 
- token : id
- id-->object
- middleware: --> filter --> controller token verify... :

# What to do 
### in backend make middleware folder in src and authMiddleware.js file
 
    const jwt = require("jsonwebtoken")
    const secret = "secret"

    const authMiddleware = (req,res,next)=>{

    var token = req.headers.authorization;

    if(token){
        
        if(token.startsWith("Bearer ")){

            //remove Bearer // string split
            //Bearer mkldjoisjalsjijsijsasiao // [Bearer,tokenn]
            token = token.split(" ")[1]
            //token verify..
            try{

                const userFromToken = jwt.verify(token,secret)
                console.log(userFromToken)
                next()

            }catch(err){

                res.status(500).json({
                    message:"token is not valid...."
                })

            }

        }
        else{
            res.status(400).json({
                message:"token is not Bearer token"
            })
        }
        

        
    }
    else{
        res.status(400).json({
            message:"token is required.."
        })
    }
    }

    module.exports = {
    authMiddleware
    }

###  require jwt from jsonwebtoken and also secret
    const jwt = require("jsonwebtoken");
    const secret = "secret";
### in usercontroller make loginuserWithToken
    const loginuserWithToken = async(req,res)=>{

    const {email,password} = req.body;

    const foundUserFromEmail =  await userModel.findOne({email:email})
    if(foundUserFromEmail){
    const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password)
    if(isMatch){

      //token...
      const token = jwt.sign(foundUserFromEmail.toObject(),secret)
      //const token = jwt.sign({id:foundUserFromEmail._id},secret)
      res.status(200).json({
        message:"user loggedin..",
        token:token
      })
      

    }
    else{
      res.status(420).json({
        message:"invalid cred..."
      })
    }

    }
    else{
    res.status(404).json({
      message:"user not found.."
    })
    }
    }

### in userroutes add this route
    const authMiddleware = require("../middleware/AuthMiddleware")

    routes.get("/users",authMiddleware.authMiddleware,userController.getAllUsers)
    routes.post("/user/login",userController.loginuserWithToken)


### in frontend update this in login page and remove previous submitHandler func

    const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res.data.token)
      localStorage.setItem("token",res.data.token)
    } catch (error) {
      alert("Login Failed");
    }
    };

    const userApi = async()=>{
    axios.get("url",{
      headers:{
        "Authorization":"Beaer "+localStorage.getItem("token")
      }
    })
    }