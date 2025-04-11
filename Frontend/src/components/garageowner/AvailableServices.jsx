import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../../assets/css/services.css"

export const AvailableServices = () => {

    const [availableServices, setAvailableServices] = useState([]);


    useEffect(() => {
        axios.get("/service/getservicesbyuserid/" + localStorage.getItem("id")).then((response) => {
            setAvailableServices(response.data.data);
        }).catch((err) => {
            setError("Failed to fetch available services", err);
        }); 
    }, []);

    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#dce1f5",
                    minHeight: "90vh" 
                }}
            >
                <h2 style={{
                    marginBottom: "20px", fontSize: "2.3rem", padding: "12px",
                    width: "100%",
                    margin: "auto",
                    color: "black"
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
                        {availableServices.map((service,index) => (
                            <div
                                key={service._id}
                                style={{
                                    // borderRadius: "12px",
                                    overflow: "hidden",
                                    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                    // backgroundColor: "#fff",
                                    textAlign: "center",
                                    transition: "transform 0.2s ease-in-out",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    padding:"20px",
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

                                    <div className='service-img-container'>

                                        <img
                                            src={service.serviceURL}
                                            alt={service.name}
                                            className='ser-img'
                                        />
                                    </div>

                                )}

                                {/* Service Details */}
                                <div>
                                    <div style={{ padding: "15px", textAlign:"left" }}>
                                        <h3 className='serv-h3'>
                                            {service.name}
                                        </h3>
                                        <div style={{marginLeft:"50px"}}>

                                        <p style={{ color: "#666", fontSize: "1rem", width:"18.6rem", margin:"auto" }}>
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
                                    </div>

                                {/* update Button */}
                                <Link
                                    to={`/garageowner/updateservice/${service._id}`}
                                    className='serv-btn'>
                                    Update
                                </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
