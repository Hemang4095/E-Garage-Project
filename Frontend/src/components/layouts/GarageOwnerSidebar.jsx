import React, { useState } from "react";
import { GarageOwnerNavbar } from "./GarageOwnerNavbar";
import GarageLogo from "../../assets/images/E-Garage_logo3.webp"
import { Link, Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const GarageOwnerSidebar = () => {
  const [hover, setHover] = useState(false);
  //for closing sidebar...
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar"); 
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <GarageOwnerNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar shadow ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"
          }`}
        data-bs-theme="dark"
        style={{
          backgroundColor: "rgb(37 78 139)",
          position: "fixed",
          top: "66px", // below navbar
          left: 0, // ⬅️ now on the LEFT side
          height: "100%",
          zIndex: 1050,
        }}
      >
        <div className="sidebar-brand" style={{borderBottom:"1px solid white"}}>
          <Link to="" className="brand-link user-sidebar-head" >
            <img
              src={GarageLogo}
              className="brand-image opacity-75 shadow user-sidebar-img"
              style={{
                borderRadius: "60px", transform: hover ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out"
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />

            <span className="brand-text fw-light  user-sidebar-imgtext">E-Garage</span>
          </Link>
        </div>

       
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column user-sidebar-ul">
              <li className="nav-item menu-open">
                <Link to="addgarage" className="nav-link active user-sidebar-link" style={{ color: "white" }}>
                  <i className="bi bi-house-add"></i>
                  <p className='user-sidebar-link-para'>
                    AddGarage
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="mygarages" className="nav-link active user-sidebar-link" style={{ color: "white" }}>
                  <i className="bi bi-car-front"></i>
                  <p className='user-sidebar-link-para'>
                    View My Garages
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="addservices" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                  <i className="bi bi-tools"></i>
                  <p className='user-sidebar-link-para'>
                    Add Services
                  </p>
                </Link>
              </li>

             

            </ul>
          </nav>
      </aside>
      <main class="app-main custom-scrollbar" style={{ backgroundColor: "#dce1f5", paddingBottom: "0px", paddingTop: "66px" , height:"100vh"}}>
        <Outlet></Outlet>
        <Footer></Footer>
      </main>
    </>
  );
};



