import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/viewmyvehicle.css";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export const ViewMyVehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const userId = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`/vehicle/getvehicleBy/${userId}`);
                setVehicles(response.data.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        fetchVehicles();
    }, [userId]);

    const removeVehicle = async (vehicleId) => {
        try {
            const res = await axios.delete(`/vehicle/deletevehicle/${vehicleId}`);
            setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
            if (res.status === 200) {
                toast.success('Vehicle removed', {
                    position: "bottom-right",
                    autoClose: 2000,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error removing vehicle:", error);
            toast.error(error.response ? 'vehicle not deleted' : 'network error! please try again', {
                position: "bottom-right",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const handleServiceNow = (vehicle) => {
        navigate("/user/garages", {
            state: { selectedVehicle: vehicle } // ✅ Passing full vehicle object (you can also pass just vehicle._id if preferred)
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="my-veh-m-cont">
                <h2 className="my-veh-title">My Vehicles</h2>

                <div className="my-veh-container">
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <div key={vehicle._id} className="my-veh-card">
                                <p className="my-veh-details"><strong>Name:</strong> {vehicle.make} {vehicle.model}</p>
                                <p className="my-veh-details"><strong>MFG Year:</strong> {vehicle.mfgYear}</p>
                                <p className="my-veh-details"><strong>License Plate:</strong> {vehicle.licensePlate}</p>
                                <div className="my-veh-btn-container">
                                    <button className="my-veh-btn my-veh-btn-view" onClick={() => removeVehicle(vehicle._id)}>Remove Vehicle</button>
                                    <button className="my-veh-btn my-veh-btn-service" onClick={() => handleServiceNow(vehicle)}>Service Now</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="my-veh-noveh-para">No vehicles found.</p>
                    )}
                </div>
            </div>


            <section className="my-veh-cta-section">
                <div className="my-veh-cta-container">
                    <h2 className="my-veh-cta-heading">
                        {vehicles.length > 0
                            ? "Ready to Experience Our Service?"
                            : "No Vehicle Yet?"}
                    </h2>
                    <p className="my-veh-cta-text">
                        {vehicles.length > 0
                            ? "Book an appointment today and see why our customers trust us with their vehicles."
                            : "Add your vehicle to get started with our amazing services."}
                    </p>
                    <div className="my-veh-cta-buttons">
                        {vehicles.length > 0 && (
                            <Link to="/user/garages" className="my-veh-cta-btn-1">
                                Book Appointment
                            </Link>
                        )}
                        <Link to="/user/addvehicle" className="my-veh-cta-btn-2">
                            Add Vehicle
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

