// import React, { useState } from "react";
// import { UserNavbar } from "./UserNavbar";
// import { Link, Outlet } from "react-router-dom";
// import GarageLogo from "../../assets/images/E-Garage_logo3.webp"
// import { Footer } from "./Footer";
// import "../../assets/css/sidebar.css"

// export const UserSidebar = () => {
//     const [hover, setHover] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     console.log("toggleSidebar");
//     setSidebarOpen(!isSidebarOpen);
//   };
//   return (
//     <>
//       <UserNavbar toggleSidebar={toggleSidebar} />
//       <aside
//         className={`app-sidebar shadow ${isSidebarOpen ? "open" : "d-none"
//           }`}
//         data-bs-theme="dark"
//         style={{ backgroundColor: "rgb(97 103 146)"}}
//       >
//         <div className="sidebar-brand" style={{ fontFamily: "'Great Vibes', sans-serif" }}>
//           <Link to="" className="brand-link">
//             <img
//               src={GarageLogo}
//               className="brand-image opacity-75 shadow"
//               style={{
//                 borderRadius: "60px", transform: hover ? "scale(1.2)" : "scale(1)",
//                 transition: "transform 0.3s ease-in-out"
//               }}
//               onMouseEnter={() => setHover(true)}
//               onMouseLeave={() => setHover(false)}
//             />

//             <span className="brand-text fw-light">E-Garage</span>
//           </Link>
//         </div>

//         <div
//           className=""
//           data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
//           tabIndex={-1}
//           style={{
//             marginRight: "-16px",
//             marginBottom: "-16px",
//             marginLeft: 0,
//             top: "-8px",
//             right: "auto",
//             left: "-8px",
//             width: "calc(100% + 16px)",
//             padding: 8,
//           }}
//         >
//           <nav className="mt-2">
//             <ul
//               className="nav sidebar-menu flex-column"
//               data-lte-toggle="treeview"
//               role="menu"
//               data-accordion="false"
//             >
//               <li className="nav-item menu-open" >
//                 <Link to="" className="nav-link active" style={{ color: "white" }}>
//                   <i className="nav-icon bi bi-speedometer" />
//                   <p>
//                     User dashboard

//                   </p>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="services" className="nav-link" style={{ color: "white" }}>
//                   <i className="bi bi-tools"></i>
//                   <p>Our Services</p>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="addvehicle" className="nav-link" style={{ color: "white" }}>
//                   <i className="bi bi-plus-circle"></i>
//                   <p>Add Vehicle</p>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="myvehicles" className="nav-link" style={{ color: "white" }}>
//                   <i className="bi bi-car-front-fill"></i>
//                   <p>My Vehicles</p>
//                 </Link>
//               </li>

//             </ul>
//           </nav>
//         </div>
//       </aside>
//       <main class="app-main" style={{ backgroundColor: "#dce1f5", paddingBottom:"0px", paddingTop: "56px" }}>
//         <Outlet></Outlet>
//         <Footer></Footer>
//       </main>
//     </>
//   );
// };



import React, { useEffect, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
import GarageLogo from "../../assets/images/E-Garage_logo3.webp";
import { Footer } from "./Footer";
import "../../assets/css/sidebar.css";

export const UserSidebar = () => {
  const [hover, setHover] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Automatically collapse sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    handleResize(); // set initial state

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UserNavbar toggleSidebar={toggleSidebar} />

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
        <div className="sidebar-brand " style={{ borderBottom: "1px solid white" }}>
          <Link to="" className="brand-link user-sidebar-head">
            <img
              src={GarageLogo}
              className="brand-image user-sidebar-img"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                borderRadius: "60px",
                transform: hover ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
            <span className="brand-text user-sidebar-imgtext">E-Garage</span>
          </Link>
        </div>

        <nav className="mt-2">
          <ul className="nav sidebar-menu flex-column user-sidebar-ul">
            <li className="nav-item menu-open">
              <Link to="" className="nav-link active user-sidebar-link" style={{ color: "white" }}>
                <i className="nav-icon bi bi-speedometer" />
                <p className='user-sidebar-link-para'>User dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="services" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="bi bi-tools"></i>
                <p className='user-sidebar-link-para'>Our Services</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="addvehicle" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="bi bi-plus-circle"></i>
                <p className='user-sidebar-link-para'>Add Vehicle</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="myvehicles" className="nav-link user-sidebar-link" style={{ color: "white" }}>
                <i className="bi bi-car-front-fill"></i>
                <p className='user-sidebar-link-para'>My Vehicles</p>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="app-main custom-scrollbar" style={{ backgroundColor: "#dce1f5", paddingTop: "66px",  paddingBottom: "0", height:"100vh"}} >
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

