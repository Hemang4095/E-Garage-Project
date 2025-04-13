import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/garagedetail.css'; // Make sure this CSS file uses user-gara-det- prefix
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion'
import StarBorderIcon from "@mui/icons-material/StarBorder";



export const GarageDetails = () => {
    const { id } = useParams();
    const [garage, setGarage] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [ratingCount, setRatingCount] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const selectedVehicle = location.state?.selectedVehicle;
    const selectedGarage = location.state?.selectedGarage;



    useEffect(() => {
        // Fetch garage info
        axios.get(`/garage/getgarageby/${id}`)
            .then(res => setGarage(res.data.data))
            .catch(err => console.error(err));

        // Fetch services for this garage
        axios.get(`/service/getservices/${id}`)
            .then(res => setServices(res.data.data))
            .catch(err => console.error(err));

        axios
            .get(`/review/averagereview/${id}`)
            .then((res) => {
                setAverageRating(res.data.average?.toFixed(1));
                setRatingCount(res.data.count);
            })
            .catch((err) => console.error(err));

    }, [id]);

    const toggleServiceSelection = (service) => {
        const exists = selectedServices.find(s => s._id === service._id);
        if (exists) {
            setSelectedServices(selectedServices.filter(s => s._id !== service._id));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };


    const proceedToAppointment = () => {
        if (!selectedVehicle || !selectedGarage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.warn('Please select a vehicle and garage before booking.', {
                position: "top-right",
                autoClose: 2000,
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
                selectedGarage,
                selectedServices
            }
        });
    };


    const handleReviewClick = (garageId) => {
        navigate(`/user/addreview/${garageId}`, {
          state: { selectedGarage: garage }
        });
      };
    
    

    if (!garage) return <div className="user-gara-det-loading">Loading...</div>;

    return (
        <>
            <button onClick={() => navigate(-1)} className="user-gara-det-go-back-button">
                ← Go Back
            </button>
            <div className="user-gara-det-wrapper">

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
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


                <div className='user-gara-det-first-cont'>

                    <div className="user-gara-det-img-container">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <img src={garage.garageURL} alt="Garage" className="user-gara-det-img" />
                        </motion.div>

                    </div>
                    <div className="user-gara-det-header">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <h1 className="user-gara-det-title">{garage.name}</h1>
                            <p className="user-gara-det-owner user-gara-det-para">Owner: {garage.owner}</p>
                            <p className="user-gara-det-contact user-gara-det-para">Phone: {garage.phoneno}</p>
                            <p className="user-gara-det-email user-gara-det-para">Email: {garage.email}</p>
                            <p className="user-gara-det-time user-gara-det-para">Open: {garage.openingHours}</p>
                            <div className="user-gara-det-location">
                                <p className='user-gara-det-para'><strong>Location:</strong> {garage.areaId?.name}, {garage.cityId?.name}, {garage.stateId?.name}</p>
                            </div>
                            <p className='user-gara-det-para'><strong>Rating:</strong>{" "} {averageRating !== null ? ` ${averageRating} ⭐ (${ratingCount})` : "No ratings yet"}</p>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginTop: "1rem"
                                }}
                            > 
                                <StarBorderIcon
                                    onClick={() => handleReviewClick(garage._id)}
                                    style={{ cursor: "pointer", fontSize: "1.5rem", color: "rgb(105, 162, 228)" }}
                                />
                                <span onClick={() => handleReviewClick(garage._id)}
                                    style={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", color: "rgb(105, 162, 228)" }} >
                                    Add a review
                                </span>
                            </div>

                        </motion.div>

                    </div>

                </div>



                <div className="user-gara-det-services">
                    <h2 className="user-gara-det-subtitle">Available Services</h2>
                    <div className="user-gara-det-service-grid">
                        {services.length > 0 ? services.map(service => {
                            const isSelected = selectedServices.some(s => s._id === service._id);
                            return (
                                <div className="user-gara-det-service-card" key={service._id}>
                                    <img src={service.serviceURL} alt={service.name} className="user-gara-det-service-img" />
                                    <h3 className="user-gara-det-service-name">{service.name}</h3>
                                    <p className="user-gara-det-service-desc">{service.description}</p>
                                    <p className="user-gara-det-service-price">₹{service.allInclusivePrice}</p>
                                    <p className="user-gara-det-service-duration">{service.duration} min</p>
                                    <p className="user-gara-det-service-cat">Category: {service.category}</p>
                                    <button
                                        onClick={() => toggleServiceSelection(service)}
                                        className={`user-gara-det-book-btn ${isSelected ? 'selected' : ''}`}
                                    >
                                        {isSelected ? 'Remove' : 'Add'}
                                    </button>
                                </div>
                            );
                        }) : <p>No services available for this garage.</p>}
                    </div>
                    {selectedServices.length > 0 && (
                        <div className="user-gara-det-proceed-wrapper">
                            <button onClick={proceedToAppointment} className="user-gara-det-proceed-btn">
                                Proceed to Book ({selectedServices.length} service{selectedServices.length > 1 ? 's' : ''})
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
};
