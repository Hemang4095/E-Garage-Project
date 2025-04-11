import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/garageownerviewservices.css";
import { useNavigate } from "react-router-dom";

export const GarageServices = () => {
    const [garageServices, setGarageServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGaragesAndServices = async () => {
            const userId = localStorage.getItem("id");
            try {
                const garageRes = await axios.get(`/garage/getgaragesbyuserid/${userId}`);
                const garages = garageRes.data.data;

                const servicesWithGarage = await Promise.all(
                    garages.map(async (garage) => {
                        const serviceRes = await axios.get(`service/getservices/${garage._id}`);
                        return {
                            garage,
                            services: serviceRes.data.data
                        };
                    })
                );

                setGarageServices(servicesWithGarage);
            } catch (err) {
                console.error("Error fetching garages or services:", err);
            }
        };

        fetchGaragesAndServices();
    }, []);

    return (
        <div className="garown-view-serv-container">
            <h1 className="garown-view-serv-title">Your Garages & Services</h1>

            {garageServices.length === 0 ? (
                <p className="garown-view-serv-no-data">No garages or services found.</p>
            ) : (
                garageServices.map(({ garage, services }) => (
                    <div key={garage._id} className="garown-view-serv-garage-section">
                        <h2 className="garown-view-serv-garage-name">{garage.name}</h2>
                        {services.length === 0 ? (
                            <p className="garown-view-serv-no-services">No services for this garage.</p>
                        ) : (
                            <div className="garown-view-serv-services-list">
                                {services.map((service) => (
                                    <div key={service._id} className="garown-view-serv-service-card">
                                        <img
                                            src={service.serviceURL}
                                            alt={service.name}
                                            className="garown-view-serv-service-img"
                                        />
                                        <h3>{service.name}</h3>
                                        <p><strong>Category:</strong> {service.category}</p>
                                        <p><strong>Price:</strong> ₹{service.allInclusivePrice}</p>
                                        <p><strong>Duration:</strong> {service.duration} mins</p>
                                        <p><strong>Rating:</strong> {service.ratings}</p>
                                        <p><strong>Status:</strong> {service.availability ? "Available" : "Unavailable"}</p>
                                        <button
                                            className="garown-view-serv-update-btn"
                                            onClick={() => navigate(`/garageowner/updateservice/${service._id}`)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
