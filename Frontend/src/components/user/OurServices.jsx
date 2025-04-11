//--> new one

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/services.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const OurServices = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // 🟡 Get selected vehicle from previous page
  const { selectedVehicle } = location.state || {};

  useEffect(() => {
    axios
      .get("/service/getallservices")
      .then((response) => {
        setAvailableServices(response.data.data);
      })
      .catch((err) => {
        setError("Failed to fetch available services");
      });
  }, []);

  const handleSelectService = (service) => {
    const alreadySelected = selectedServices.find(s => s._id === service._id);
    if (alreadySelected) {
      // If already selected, remove it
      setSelectedServices(selectedServices.filter(s => s._id !== service._id));
    } else {
      // Add service to selection
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedVehicle) {
      toast.warn('First Select Vehicle! Then select services', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => navigate("/user/myvehicles")
        });
      return;
    }
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    navigate("/user/bookappointment", {
      state: {
        selectedVehicle,
        selectedServices
      }
    });
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
          color: "black"
        }}>
          Services
        </h2>

        {availableServices.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            No services available.
          </p>
        ) : (
          <div style={{ padding: "20px" }}>
            {availableServices.map((service, index) => {
              const isSelected = selectedServices.find(s => s._id === service._id);

              return (
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
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    backgroundColor: isSelected ? "rgb(170 209 255)" : "", // Highlight selected
                    borderRadius: "10px",
                    marginBottom: "10px"
                  }}
                >
                  {service.serviceURL && (
                    <div className="service-img-container">
                      <img
                        src={service.serviceURL}
                        alt={service.name}
                        className='ser-img'
                      />
                    </div>
                  )}

                  <div style={{ padding: "15px", textAlign: "left" }}>
                    <h3 className='serv-h3'>{service.name}</h3>

                    <div style={{ marginLeft: "50px" }}>
                      <p style={{ color: "#666", fontSize: "1rem", width: "18.6rem", margin: "auto" }}>
                        {service.description}
                      </p>
                      <p><strong>Category:</strong> {service.category}</p>
                      <p><strong>Price:</strong> ₹{service.allInclusivePrice}</p>
                      <p><strong>Duration:</strong> {service.duration} mins</p>
                      <p>
                        <strong>Availability:</strong>{" "}
                        <span style={{
                          color: service.availability ? "green" : "red",
                          fontWeight: "bold"
                        }}>
                          {service.availability ? "Available" : "Not Available"}
                        </span>
                      </p>
                      <p><strong>Ratings:</strong> ⭐ {service.ratings}/5</p>
                    </div>

                    <button
                      className="serv-btn serv-book-btn"
                      onClick={() => handleSelectService(service)}
                    >
                      {isSelected ? "Remove" : "Select"} Service
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedServices.length > 0 && (
          <button
            className="serv-btn"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#114d78",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            onClick={handleBookAppointment}
          >
            Book Appointment ({selectedServices.length})
          </button>
        )}
      </div>

    </>

  );
};
