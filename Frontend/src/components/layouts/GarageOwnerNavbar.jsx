import React, { useEffect, useState } from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import profileImg from "../../assets/images/client.png"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

export const GarageOwnerNavbar = ({ toggleSidebar }) => {

  const location = useLocation();
  const isGarageActive = location.pathname.includes("mygarages") || location.pathname.includes("addgarage");

  const isServicesActive = location.pathname.includes("availableservices") || location.pathname.includes("addservices");

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


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

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
              <Link to="/" className="user-nav-logo-link">E-Garage</Link>
            </li>

            <ul className="user-nav-div-item"> 
              <li className="user-nav-item"><NavLink to="" end className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Home</NavLink></li>
              <li className="user-nav-item"><NavLink to="/contactus"  className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Contact</NavLink></li>
              <li className={`user-nav-item user-nav-garage-dropdown ${isGarageActive ? "user-nav-active" : ""}`}>
                <span className="user-nav-link">Appointments ▾</span>
                <ul className="user-nav-garage-dropdown-menu">
              <li className="user-nav-item"><NavLink to="appointments" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Appointments</NavLink></li>
              <li className="user-nav-item"><NavLink to="garageuserpayments" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-nav-link' : ''}`}>Payments</NavLink></li>
              </ul>
              </li>
              
              <li className={`user-nav-item user-nav-garage-dropdown ${isGarageActive ? "user-nav-active" : ""}`}>
                <span className="user-nav-link">Garages ▾</span>
                <ul className="user-nav-garage-dropdown-menu">
                  <li><NavLink to="addgarage" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}>Add Garage</NavLink></li>
                  <li><NavLink to="mygarages" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}>My Garages</NavLink></li>
                </ul>
              </li>
              <li className={`user-nav-item user-nav-services-dropdown ${isServicesActive ? "user-nav-active" : ""}`}>
                <span className="user-nav-link">Services ▾</span>
                <ul className="user-nav-services-dropdown-menu">
                  <li><NavLink to="availableservices" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}>Available Services</NavLink></li>
                  <li><NavLink to="garageservices" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}> Services</NavLink></li>
                  <li><NavLink to="addservices" className={({ isActive }) => `user-nav-link ${isActive ? 'user-active-drop-nav-link' : ''}`}>Add Services</NavLink></li>
                </ul>
              </li>
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