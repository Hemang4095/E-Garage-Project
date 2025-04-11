import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
// import "../../assets/css/signup.css"
import "../../assets/css/login.css"
import axios from 'axios'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { CustLoader } from './CustLoader'

export const SignUp = () => {

  const [isLoading, setisLoading] = useState(false)
  const [roles, setRoles] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm()
  // console.log("errors...", errors)
  const navigate = useNavigate()

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setisLoading(true)
        const response = await axios.get("/roles"); // Adjust API endpoint
        setRoles(response.data.data); // Assuming API returns an array of roles
        setisLoading(false)
      } catch (error) {
        console.error("Error fetching roles:", error);
        setisLoading(false)
      }
    };

    fetchRoles();
  }, []);

  const submitHandler = async (data) => {
    // console.log("data.....", data) 

    //const res = await axios.post("http://localhost:3000/user")

    //before sending data.. role bind
    try {

      // data.roleId = "67c088c3c629bfceceac7ee6"

      //Convert status checkbox value to boolean
      data.status = !!data.status;

      // Find the selected role's ID from the fetched roles
      const selectedRole = roles.find((role) => role.name === data.role);
      data.roleId = selectedRole ? selectedRole._id : null;

      if (!data.roleId) {
        toast.error("Invalid role selected! ❌");
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });


      setisLoading(true)
      // const res = await axios.post("/user", data)
      const res = await axios.post("/addwithfile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(res) //axiosobj
      console.log(res.data) //api response..
      setisLoading(false)

      //tost..
      if (res.status === 200) {
        //user added..
        toast.success('User SignUp Successful..!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/login")
        });
      }
    }
    catch (err) {
      console.log('signUp error:', err)
      setisLoading(false)
      if (err.response) {
        toast.error('user not added!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      else {
        toast.error('network error! please try again', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        console.log("Signup failed");

      }

    }


  }

  const validationSchema = {
    firstnameValidator: {
      required: {
        value: true,
        message: "firstname is required"
      },
      minLength: {
        value: 3,
        message: "minimum three char for name"
      }
    },
    emailValidator: {
      required: {
        value: true,
        message: "Email is required"
      }
    },
    passwordValidator: {
      required: {
        value: true,
        message: "setPassword is required"
      }
    },
    contactnoValidator: {
      required: {
        value: true,
        message: "contactno is required"
      },
      pattern: {
        value: /[6-9]{1}[0-9]{9}/,
        message: "contact is not valid"
      }
    },
    roleValidator: {
      required: {
        value: true,
        message: "role is required"
      }
    }
  }

  return (
    <>
      {
        isLoading && <CustLoader />
      }
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className='login-body'>
        <header className="header_section" style={{ backgroundColor: "rgb(18 23 105)" }}>
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <Link className="navbar-brand" to="/">
                <span className="bg-orange-400">
                  E-Garage
                </span>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="s-1"> </span>
                <span className="s-2"> </span>
                <span className="s-3"> </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                  <ul className="navbar-nav  ">
                    <li className="nav-item ">
                      <Link className="nav-link login-head-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link login-head-link" to="/aboutus">
                        {" "}
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link login-head-link" to="/services">
                        {" "}
                        Services{" "}
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link login-head-link" to="/contactus">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="quote_btn-container " style={{ marginBottom: "7px" }}>
                  <div className="">
                    <Link to="/login" className="btn-1 ">
                      Login
                    </Link>
                    <Link to="/signup" className="btn-2">
                      Signup
                    </Link>
                  </div>
                  <form className="form-inline">
                    <button
                      className="btn  my-2 my-sm-0 nav_search-btn"
                      type="submit"
                    />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <div className="login-signup-body">
          <div className="login-signup-container" style={{ margin: "31px 0px", padding: '30px 40px' }}>

            <div className="login-signup-form-box">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="login-signup-input-box">
                  <input type="text" placeholder="Username" {...register('firstname', validationSchema.firstnameValidator)} />
                  {errors.firstname && <p className="login-signup-error">{errors.firstname.message}</p>}
                </div>
                <div className="login-signup-input-box">
                  <input type="email" placeholder="Email" {...register('email', validationSchema.emailValidator)} />
                  {errors.email && <p className="login-signup-error">{errors.email.message}</p>}
                </div>
                <div className="login-signup-input-box">
                  <input type="password" placeholder="setPassword" {...register('password', validationSchema.passwordValidator)} />
                  {errors.password && <p className="login-signup-error">{errors.password.message}</p>}
                </div>
                <div className="login-signup-input-box">
                  <input type="text" placeholder="contactno" {...register("contactno", validationSchema.contactnoValidator)} />
                  {errors.contactno && <p className="login-signup-error">{errors.contactno.message}</p>}
                </div>
                <div style={{ color: "white", textAlign: "left" }}>
                  <label>Status:</label>
                  <input type="checkbox" {...register("status")} value="true" style={{ marginLeft: "10px" }} />
                  <span style={{ marginLeft: "5px" }}>Active</span>
                </div>
                <div className="login-signup-input-box">
                  <select {...register("role", validationSchema.roleValidator)}>
                    <optgroup label='Select your role:'>
                      {roles.map((role) => (
                        <option key={role._id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.role && <p className="login-signup-error">{errors.role.message}</p>}
                </div>


                <div style={{ marginBottom: "10px" }} className="login-signup-input-box">
                  <label style={{ color: "white", textAlign: "left", display: "block" }}>Profile Picture:</label>
                  <input
                    type="file"
                    {...register("image", { required: "Image is required" })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "5px",
                      background: "#fff"
                    }}
                  />
                  {errors.image && <p className="login-signup-error">{errors.image.message}</p>}

                </div>

                <button className="login-signup-button" type="submit">Sign Up</button>
                <p className="login-signup-text">Already have an account? <Link className="login-signup-link" to="/login" >Log in</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}




