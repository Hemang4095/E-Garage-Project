import React, { useEffect, useState } from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import profileImg from "../../assets/images/client.png"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from "../common/UserContext";
import "../../assets/css/navbar.css"


export const UserNavbar = ({ toggleSidebar }) => {

  const location = useLocation();
  const isVehiclesActive = location.pathname.includes("myvehicles") || location.pathname.includes("addvehicle");

  // const { user, setUser } = useUser();
  const [user, setUser] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate()
  const [showOptions, setShowOptions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    let timer;
    if (isDropdownOpen) {
      timer = setTimeout(() => {
        setShowOptions(true);
      }, 1000);
    } else {
      setShowOptions(false); // reset when dropdown closes
    }

    return () => clearTimeout(timer);
  }, [isDropdownOpen]);


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };


  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("id"); // Get user ID from localStorage

      if (!userId) return;

      try {
        const response = await axios.get(`/user/${userId}`); // Call your API
        if (response.data && response.data.data) {
          setUser(response.data.data); // Store user data in state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();

    const interval = setInterval(() => {
      fetchUserDetails(); // Fetch data every 3 seconds
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  const handleLogout = () => {
    try {

      // localStorage.removeItem("id");
      // localStorage.removeItem("role");
      localStorage.clear()

      toast.info('user logged out!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => {
          navigate("/login")
        }
      });

    } catch (err) {
      console.log('error message', err)

      if (err.response) {
        toast.error('something went wrong!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

      } else {
        toast.error('network error!,please try again', {
          position: "top-right",
          autoClose: 1000,
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

  const getDefaultAvatar = (name) => {
    if (!name) return ""; // If no name, return empty
    return `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=random&color=fff&size=80&bold=true`;
  };





  return (
    <>


      <ToastContainer
        position="top-right"
        autoClose={1000}
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
      {/* <nav className="app-header navbar navbar-expand " style={{
        backgroundColor: "rgb(18 23 105)", border: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding:"12px 0"
      }}>
        
        <div className="container-fluid">
          <ul className="navbar-nav">

            <li className="nav-item d-md-none">
              <Link
                className="nav-link btn btn-light"
                to="#"
                role="button"
                style={{
                  padding: "7px 10px",
                  borderRadius: "5px",
                  backgroundColor: hover ? "#173c72" : "rgb(18 23 105)",
                  transition: "background-color 0.3s ease-in-out",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={toggleSidebar}
              >
                <i className="fa-solid fa-bars" style={{ color: "#ffffff", height: "25px", width: "25px", fontSize: "25px" }}></i>
              </Link>
            </li>

            
            <li className="nav-item d-none d-md-flex align-items-center px-3">
              <Link to="/" className="nav-link d-flex align-items-center" style={{ color: "white", fontSize: "20px", fontWeight: "600" }}>

                E-Garage
              </Link>
            </li>


            <li className="nav-item d-none d-md-block">
              <Link to="/" className="nav-link" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item d-none d-md-block">
              <Link to="/contactus" className="nav-link" style={{ color: "white" }}>
                Contact
              </Link>
            </li>
            <li className="nav-item d-none d-md-block">
              <Link to="myappointments" className="nav-link" style={{ color: "white" }}>
                My Appointments
              </Link>
            </li>
            <li className="nav-item d-none d-md-block">
              <Link to="myvehicles" className="nav-link" style={{ color: "white" }}>
                My Vehicles
              </Link>
            </li>

          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="navbar-search"
                href="#"
                role="button"
              >
                <i className="bi bi-search" style={{ color: "white" }} />
              </a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link" data-bs-toggle="dropdown" href="#">
                <i className="bi bi-chat-text" style={{ color: "white" }} />
                <span className="navbar-badge badge text-bg-danger">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                <a href="#" className="dropdown-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src="../../dist/assets/img/user1-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 rounded-circle me-3"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-end fs-7 text-danger">
                          <i className="bi bi-star-fill" />
                        </span>
                      </h3>
                      <p className="fs-7">Call me whenever you can...</p>
                      <p className="fs-7 text-secondary">
                        <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
               
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src="../../dist/assets/img/user8-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 rounded-circle me-3"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-end fs-7 text-secondary">
                          <i className="bi bi-star-fill" />
                        </span>
                      </h3>
                      <p className="fs-7">I got your message bro</p>
                      <p className="fs-7 text-secondary">
                        <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src="../../dist/assets/img/user3-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 rounded-circle me-3"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-end fs-7 text-warning">
                          <i className="bi bi-star-fill" />
                        </span>
                      </h3>
                      <p className="fs-7">The subject goes here</p>
                      <p className="fs-7 text-secondary">
                        <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer" >
                  See All Messages
                </a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link" data-bs-toggle="dropdown" href="#">
                <i className="bi bi-bell-fill" style={{ color: "white" }} />
                <span className="navbar-badge badge text-bg-warning">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                <span className="dropdown-item dropdown-header">
                  15 Notifications
                </span>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="bi bi-envelope me-2" /> 4 new messages
                  <span className="float-end text-secondary fs-7">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="bi bi-people-fill me-2" /> 8 friend requests
                  <span className="float-end text-secondary fs-7">12 hours</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="bi bi-file-earmark-fill me-2" /> 3 new reports
                  <span className="float-end text-secondary fs-7">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">
                  {" "}
                  See All Notifications{" "}
                </a>
              </div>
            </li>


            <li className="nav-item">
              <a className="nav-link" href="#" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <i className="bi bi-fullscreen-exit" style={{ color: "white" }} />
                ) : (
                  <i className="bi bi-arrows-fullscreen" style={{ color: "white" }} />
                )}
              </a>
            </li>


            <li className="nav-item dropdown user-menu">
              <Link
                to="#"
                className="nav-link dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
                onClick={() => setIsDropdownOpen(prev => !prev)}
              >
                <img
                  src={user?.image || getDefaultAvatar(user?.firstname)}
                  className="user-image rounded-circle shadow me-2"
                  alt="User"
                  width="40"
                  height="40"
                  style={{ marginTop: "2px" }}
                />
                <span className="d-none d-md-inline fw-normal" style={{ color: "white" }}>
                  {user?.firstname || "Guest"}
                </span>
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end"
                style={{
                  borderRadius: "6px",
                  backgroundColor: "rgb(13 75 129)",
                  color: "white",
                  minWidth: "280px",
                  minHeight: "200px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >

                <li
                  className="user-header text-center p-3"
                  style={{
                    borderRadius: "6px 6px 0 0",
                    backgroundColor: "rgb(13 75 129)",
                    color: "white",
                  }}
                >
                  <img
                    src={user?.image || getDefaultAvatar(user?.firstname)}
                    className="rounded-circle shadow mb-2"
                    alt="User"
                    width="80"
                    height="80"
                  />
                  <p className="mb-0">{user?.firstname || "Guest"}</p>
                  <p className="mb-0" style={{ color: "#80a5ff" }}>
                    <i className="bi bi-person"></i> {localStorage.getItem("role")}
                  </p>
                  <small className="opacity-75">
                    Member since {user?.createdAt?.substring(0, 10) || "N/A"}
                  </small>
                </li>



                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      key="options"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, ease: "circInOut" }}
                    >
                      <div className="row" style={{ backgroundColor: "white", padding: "10px" }}>
                        <div className="col-6 text-center">
                          <Link to="profile" className="dropdown-item py-2 user-nav-drop-prof-link ">
                            Profile
                          </Link>
                        </div>
                        <div className="col-6 text-center">
                          <Link to="services" className="dropdown-item py-2 user-nav-drop-serv-link">
                            Services
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>


                <li
                  className="user-footer text-center border-top"
                  style={{
                    borderRadius: "0 0 6px 6px",
                    backgroundColor: "rgb(13 75 129)",
                  }}
                >
                  <button
                    className="btn btn-sm w-50 py-2 mt-2 user-nav-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav> */}


      <nav className="user-nav-header">
        <div className="user-nav-container">
          <ul className="user-nav-left">
            {/* Toggle for small screens */}
            <li className="user-nav-toggle">
              <Link
                to="#"
                className="user-nav-toggle-btn"
                onClick={toggleSidebar}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <i className="fa-solid fa-bars user-nav-toggle-icon"></i>
              </Link>
            </li>

            {/* Logo */}
            <li className="user-nav-logo">
              <Link to="/user" className="user-nav-logo-link">E-Garage</Link>
            </li>

            <ul className="user-nav-div-item">
              <li className="user-nav-item"><NavLink to="/" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Home</NavLink></li>
              <li className="user-nav-item"><NavLink to="/contactus" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Contact</NavLink></li>
              <li className={`user-nav-item user-nav-services-dropdown ${isVehiclesActive ? "user-nav-active" : ""}`}>
              <span className="user-nav-link">Appointments ▾</span> 
              <ul className="user-nav-services-dropdown-menu">
              <li className="user-nav-item"><NavLink to="myappointments" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>My Appointments</NavLink></li>
              <li className="user-nav-item"><NavLink to="userpayments" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Payments</NavLink></li>
              </ul>
              </li>
              <li className={`user-nav-item user-nav-services-dropdown ${isVehiclesActive ? "user-nav-active" : ""}`}>
                <span className="user-nav-link">Vehicles ▾</span> 
                <ul className="user-nav-services-dropdown-menu">
                  <li className="user-nav-item"><NavLink to="myvehicles" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}>My Vehicles</NavLink></li>
                  <li className="user-nav-item"><NavLink to="addvehicle" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}>Add Vehicle</NavLink></li>
                </ul>
              </li>
              <li className="user-nav-item"><NavLink to="services" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Our Services</NavLink></li>
              <li className="user-nav-item"><NavLink to="garages" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Our Garages</NavLink></li>
            </ul>

          </ul>

          <ul className="user-nav-right">
            {/* Search */}
            <li><a href="#" className="user-nav-icon"><i className="bi bi-search" /></a></li>

            {/* Fullscreen */}
            <li>
              <a href="#" className="user-nav-icon" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <i className="bi bi-fullscreen-exit" />
                ) : (
                  <i className="bi bi-arrows-fullscreen" />
                )}
              </a>
            </li>

            {/* Profile */}

            <li className="nav-item dropdown user-menu">
              <Link
                to=""
                className="nav-link dropdown-toggle d-flex align-items-center user-nav-dropdown-link"
                data-bs-toggle="dropdown"
                onClick={() => setIsDropdownOpen(prev => !prev)}
              >
                <img
                  src={user?.image || getDefaultAvatar(user?.firstname)}
                  className="user-image rounded-circle shadow me-2"
                  alt="User"
                  width="40"
                  height="40"
                  style={{ marginTop: "2px" }}
                />
                <span className="d-none d-md-inline fw-normal" style={{ color: "white" }}>
                  {user?.firstname || "Guest"}
                </span>
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end"
                style={{
                  borderRadius: "6px",
                  backgroundColor: "rgb(13 75 129)",
                  color: "white",
                  minWidth: "280px",
                  minHeight: "266px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >

                <li
                  className="user-header text-center p-3"
                  style={{
                    borderRadius: "6px 6px 0 0",
                    backgroundColor: "rgb(13 75 129)",
                    color: "white",
                  }}
                >
                  <img
                    src={user?.image || getDefaultAvatar(user?.firstname)}
                    className="rounded-circle shadow mb-2"
                    alt="User"
                    width="80"
                    height="80"
                  />
                  <p className="mb-0">{user?.firstname || "Guest"}</p>
                  <p className="mb-0" style={{ color: "#80a5ff" }}>
                    <i className="bi bi-person"></i> {localStorage.getItem("role")}
                  </p>
                  <small className="opacity-75">
                    Member since {user?.createdAt?.substring(0, 10) || "N/A"}
                  </small>
                </li>
                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      key="options"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, ease: "circInOut" }}
                    >
                      <div className="row" style={{ backgroundColor: "white", padding: "10px" }}>
                        <div className="col-6 text-center">
                          <Link to="profile" className="dropdown-item py-2 user-nav-drop-prof-link ">
                            Profile
                          </Link>
                        </div>
                        <div className="col-6 text-center">
                          <Link to="services" className="dropdown-item py-2 user-nav-drop-serv-link">
                            Services
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <li
                  className="user-nav-dropdown-footer"
                  style={{
                    borderRadius: "0 0 6px 6px",
                    backgroundColor: "rgb(13 75 129)",
                  }}
                >
                  <button
                    className="btn btn-sm w-50 py-2 mt-2 user-nav-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
};

