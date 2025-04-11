

import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import axios from "axios";
import { HowMyWork } from "./HowMyWork";
import { Link, useNavigate } from "react-router-dom";

export const UserDashboard = () => {

  const [availableServices, setAvailableServices] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/service/getallservices").then((response) => {
        setAvailableServices(response.data.data);
      }).catch((err) => {
        setError("Failed to fetch available services", err);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Hero Section */}
        <div>
          <section
            style={{
              // background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
              background: " linear-gradient(155deg, rgb(122 154 243), rgb(30 85 175))",
              color: "white",
              padding: "80px 20px",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              Welcome to E-Garage
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                maxWidth: "700px",
                margin: "0 auto",
                opacity: "0.9"
              }}
            >
              Your one-stop solution for all vehicle maintenance and repair
              needs.
            </p>
          </section>
        </div>
      </div>

      {/* Services Section */}

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#dce1f5",
          minHeight: "100vh"
        }}
      >

        {error && <p style={{ color: "red" }}>{error}</p>}


        <h2 style={{
          marginBottom: "20px", fontSize: "2.3rem", padding: "12px",
          width: "100%",
          margin: "auto",
          color: "black"
          // backgroundColor: "rgb(17 77 120)",
        }}>
          Services
        </h2>

        {availableServices.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            No services available.
          </p>
        ) : (
          <div
            style={{
              padding: "20px"
            }}
          >
            {availableServices.slice(0, 3).map((service, index) => (
              <div
                key={service._id}
                style={{
                  overflow: "hidden",
                  textAlign: "center",
                  transition: "transform 0.2s ease-in-out",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "20px",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse"
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {/* Service Image */}
                {service.serviceURL && (

                  <div className="service-img-container">
                    <img
                      src={service.serviceURL}
                      alt={service.name}
                      className='ser-img'
                    />
                  </div>

                )}

                {/* Service Details */}
                <div>
                  <div style={{ padding: "15px", textAlign: "left" }}>
                    <h3 className='serv-h3'>
                      {service.name}
                    </h3>

                    <div style={{ marginLeft: "50px" }}>
                      <p style={{ color: "#666", fontSize: "1rem", width: "18.6rem", margin: "auto" }}>
                        {service.description}
                      </p>
                      <p style={{ fontWeight: "bold", color: "#444" }}>
                        <strong>Category:</strong> {service.category}
                      </p>
                      <p style={{ fontWeight: "bold", color: "#444" }}>
                        <strong>Price:</strong>₹{service.allInclusivePrice}
                      </p>
                      <p style={{ fontWeight: "bold", color: "#444" }}>
                        <strong>Duration:</strong> {service.duration} mins
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        <strong>Availability:</strong>{" "}
                        <span
                          style={{
                            color: service.availability ? "green" : "red",
                            fontWeight: "bold"
                          }}
                        >
                          {service.availability ? "Available" : "Not Available"}
                        </span>
                      </p>
                      <p style={{ fontWeight: "bold", color: "#444" }}>
                        <strong>Ratings:</strong> ⭐ {service.ratings}/5
                      </p>
                    </div>

                    {/* Booking Button */}
                    {/* <button  className='serv-btn serv-book-btn'> 
                  Book Appointment
                </button> */}
                    <Link to="bookappointment" className='serv-btn serv-book-btn'>Book Appointment</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {availableServices.length > 3 && (
          <button onClick={() => navigate("services")} className="use-dash-explore-btn">
            Explore More
          </button>
        )}
      </div>

      <HowMyWork />
    </div>
  );
};
