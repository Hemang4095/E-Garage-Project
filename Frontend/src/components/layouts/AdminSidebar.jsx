import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AdminNavbar } from './AdminNavbar'
import { GarageList } from '../admin/GarageList'
import GarageLogo from "../../assets/images/E-Garage_logo3.webp"
import { Footer } from './Footer'


export const AdminSidebar = () => {
  const [hover, setHover] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
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
        <div className="sidebar-brand" style={{ borderBottom: "1px solid white" }}>

          <Link to="" className="brand-link user-sidebar-head" >

            <img
              src={GarageLogo}
              className="brand-image opacity-75 shadow  user-sidebar-img"
              style={{
                borderRadius: "60px", transform: hover ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out"
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />

            <span className="brand-text fw-light user-sidebar-imgtext">E-Garage</span>

          </Link>

        </div>


        <nav className="mt-2">

          <ul
            className="nav sidebar-menu flex-column user-sidebar-ul"
            data-lte-toggle="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link to="" className="nav-link active user-sidebar-link" style={{ color: "white" }}>
                <i className="nav-icon bi bi-speedometer" />
                <p className='user-sidebar-link-para'>
                  Dashboard
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="garagelist" className="nav-link active user-sidebar-link" style={{ color: "white" }}>
                <i class="fa-solid fa-list-check"></i>
                <p className='user-sidebar-link-para'>GarageList</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="services" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="bi bi-tools"></i>
                <p className='user-sidebar-link-para'>Services</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="./index3.html" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="nav-icon bi bi-circle" />
                <p className='user-sidebar-link-para'>Dashboard v3</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="./generate/theme.html" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="nav-icon bi bi-palette" />
                <p className='user-sidebar-link-para'>Theme Generate</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="#" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="nav-icon bi bi-box-seam-fill" />
                <p className='user-sidebar-link-para'> Widgets</p>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
        <main className='app-main custom-scrollbar' style={{ backgroundColor: "#dce1f5", paddingTop:"66px" , paddingBottom:"0", height:"100vh"}}>
          <Outlet></Outlet>
          <Footer></Footer>
        </main >
    </>
  )
}