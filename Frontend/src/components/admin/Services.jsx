import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CustLoader } from '../common/CustLoader';
import "../../assets/css/services.css"

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServices = async () => {
    try {
      const serviceRes = await axios.get("/service/getallservices");
      setServices(serviceRes.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <div style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#dce1f5",
        minHeight: "90vh"
      }}>
        {
          loading && <CustLoader />
        }
        <h2
          style={{
            marginBottom: "20px", fontSize: "2.3rem", padding: "12px",
            width: "100%",
            margin: "auto",
            color: "black"
          }}>Services</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <p className="text-gray-600">No services available at the moment.</p>
        ) : (
          <div style={{
            padding: "20px"
          }}>
            {services.map((service, index) => (
              <div
                key={service.id}
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
                <div className='service-img-container'>
                  <img
                    src={service.serviceURL || "/default-service.jpg"}
                    alt={service.name}
                    className='ser-img'
                  />
                </div>

                {/* Service Details */}
                <div style={{ padding: "15px", textAlign: "left" }}>
                  <h3 className="serv-h3">
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
                      <strong>Price:</strong> ₹{service.allInclusivePrice}
                    </p>
                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      <strong>Duration:</strong> {service.duration} mins
                    </p>

                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      <strong>Ratings:</strong> ⭐ {service.ratings}/5
                    </p>

                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      Last updated{" "}
                      {new Date(service.updatedAt).toLocaleDateString()}
                    </p>

                    {/* <p
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${service.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                      style={{ padding: "2px 12px", borderRadius: "12px", backgroundColor: "green", color: "white" }}
                    >
                      {service.availability ? "Available" : "Not Available"}
                    </p> */}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </>
  )
}