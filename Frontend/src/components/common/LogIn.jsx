import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import "../../assets/css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bounce, toast, ToastContainer } from 'react-toastify'

export const LogIn = () => {

    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log("errors...", errors)

    const [isLogin, setIsLogin] = useState(true);

    const submitHandler = async (data) => {
        console.log("data.....", data)
        try {

            const res = await axios.post("/user/login", data)
            console.log(res)
            console.log(res.data)

            if (res.status === 200) {

                localStorage.setItem("id", res.data.data._id)
                localStorage.setItem("role", res.data.data.roleId.name)
                //user added..
                toast.info('User login Sucessfull..!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    onClose: () => {
                        if (res.data.data.roleId.name === "user") {
                            navigate("/user")
                        } else if (res.data.data.roleId.name === "garageowner") {
                            navigate("/garageowner")
                        } else if (res.data.data.roleId.name === "admin") {
                            navigate("/admin")
                        }
                    }

                });
                //naviget
                // if(res.data.data.roleId.name === "user"){
                //     navigate("/user")
                // }

            }
        }
        catch (err) {
            console.log('login error:', err)

            if (err.response) {
                toast.error('something went wrong!', {
                    position: "bottom-right",
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
                toast.error('network error!,please try again', {
                    position: "bottom-right",
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
        }



    }

    const validationSchema = {
        emailValidator: {
            required: {
                value: true,
                message: "Email is required"
            }
        },
        passwordValidator: {
            required: {
                value: true,
                message: "Password is required"
            }
        }

    }


    return (
        <>
            <ToastContainer
                position="bottom-right"
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
                    <div className="login-signup-container">

                        <div className="login-signup-form-box">
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="login-signup-input-box">
                                    <input type="email" placeholder="Email" {...register('email', validationSchema.emailValidator)} />
                                    {errors.email && <p className="login-signup-error">{errors.email.message}</p>}
                                </div>
                                <div className="login-signup-input-box">
                                    <input type="password" placeholder="Password" {...register('password', validationSchema.passwordValidator)} />
                                    {errors.password && <p className="login-signup-error">{errors.password.message}</p>}
                                </div>
                                <button className="login-signup-button" type="submit">Log In</button>
                                <p className="login-signup-text">Don't have an account? <Link className="login-signup-link" to="/signup" onClick={() => setIsLogin(false)}>Sign up</Link></p>
                                <p className="login-signup-text"> <Link className="login-signup-link" to="/forgotpassword">forgot password?</Link></p>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
