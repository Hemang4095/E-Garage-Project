// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/approvedgarages.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Bounce, toast, ToastContainer } from "react-toastify";

// export const OurGarages = () => {
//     const [garages, setGarages] = useState([]);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const selectedVehicle = location.state?.selectedVehicle;

    

//     useEffect(() => {
//         const fetchGarages = async () => {
//             try {
//                 const res = await axios.get("/garage/getApprovedGarages");
//                 setGarages(res.data.data);
//             } catch (err) {
//                 console.error("Error fetching garages", err);
//             }
//         };

//         fetchGarages();
//     }, []);


//     const handleSelectGarage = (garage) => {
//         if (!selectedVehicle) {
//             window.scrollTo({ top: 0, behavior: 'smooth' }); 
//             toast.warn('Please select a vehicle before selecting a garage.', {
//                 position: "top-right",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//                 transition: Bounce,
//                 onClose: () => navigate("/user/myvehicles")
//                 });
    
//             return;
//         }
//         navigate(`/user/garagedetail/${garage._id}`, {
//             state: { selectedGarage: garage, selectedVehicle }
//         });
//     };


//     return (
//         <div className="user-gara-container">
//             <ToastContainer
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//                 transition={Bounce}
//             />
//             <h2 className="user-gara-title">Approved Garages</h2>
//             <div className="user-gara-list">
//                 {garages.map((garage) => (
//                     <div key={garage._id} className="user-gara-card">
//                         <img src={garage.garageURL} alt={garage.name} className="user-gara-image" />
//                         <div className="user-gara-info">
//                             <h3 className="user-gara-name">{garage.name}</h3>
//                             <p className="user-gara-owner">Owner: {garage.owner}</p>
//                             <p className="user-gara-contact">📍 {garage.areaId?.name}, {garage.cityId?.name}, {garage.stateId?.name}</p>
//                             <p className="user-gara-contact">📞 {garage.phoneno}</p>
//                             <p className="user-gara-contact">📧 {garage.email}</p>
//                             <div className="user-gara-btns">
//                             <Link to={`/user/garagedetail/${garage._id}`} className="user-gara-detail-btn">
//                                 View Details
//                             </Link>
//                             <button onClick={() =>  handleSelectGarage(garage)} className="user-gara-detail-btn">
//                                 Select Garage
//                             </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };




import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/approvedgarages.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Search } from "lucide-react";

export const OurGarages = () => {
    const [garages, setGarages] = useState([]);
    const [filteredGarages, setFilteredGarages] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [searchText, setSearchText] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const selectedVehicle = location.state?.selectedVehicle;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [garageRes, stateRes] = await Promise.all([
                    axios.get("/garage/getApprovedGarages"),
                    axios.get("/state/getallstates"),
                ]);
                setGarages(garageRes.data.data);
                setFilteredGarages(garageRes.data.data);
                setStates(stateRes.data.data);
            } catch (err) {
                console.error("Error fetching initial data", err);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        let result = garages;

        if (searchText.trim()) {
            result = result.filter(g =>
                g.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (selectedState) {
            result = result.filter(g => g.stateId?._id === selectedState);
        }

        if (selectedCity) {
            result = result.filter(g => g.cityId?._id === selectedCity);
        }

        if (selectedArea) {
            result = result.filter(g => g.areaId?._id === selectedArea);
        }

        setFilteredGarages(result);
    }, [searchText, selectedState, selectedCity, selectedArea, garages]);

    const handleStateChange = async (e) => {
        const stateId = e.target.value;
        setSelectedState(stateId);
        setSelectedCity("");
        setSelectedArea("");

        if (stateId) {
            const res = await axios.get(`/city/getcitybystate/${stateId}`);
            setCities(res.data.data);
            setAreas([]);
        } else {
            setCities([]);
            setAreas([]);
        }
    };

    const handleCityChange = async (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setSelectedArea("");

        if (cityId) {
            const res = await axios.get(`/area/getareabycity/${cityId}`);
            setAreas(res.data.data);
        } else {
            setAreas([]);
        }
    };

    const handleSelectGarage = (garage) => {
        if (!selectedVehicle) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.warn('Please select a vehicle before selecting a garage.', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
                onClose: () => navigate("/user/myvehicles")
            });
            return;
        }

        navigate(`/user/garagedetail/${garage._id}`, {
            state: { selectedGarage: garage, selectedVehicle }
        });
    };

    return (
        <div className="user-gara-container">
            <ToastContainer />
            <h2 className="user-gara-title">Approved Garages</h2>

            {/* <div className="user-gara-filters">
                <input
                    type="text"
                    placeholder="Search garage by name..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="user-gara-search"
                />

                <select value={selectedState} onChange={handleStateChange} className="user-gara-select">
                    <option value="">Select State</option>
                    {states.map((s) => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                </select>

                <select value={selectedCity} onChange={handleCityChange} className="user-gara-select">
                    <option value="">Select City</option>
                    {cities.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="user-gara-select">
                    <option value="">Select Area</option>
                    {areas.map((a) => (
                        <option key={a._id} value={a._id}>{a.name}</option>
                    ))}
                </select>
            </div> */}

<div className="user-gara-filters">
    {/* <input
        type="text"
        placeholder="Search garage by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="user-gara-search"
    /> */}
    <div className="user-gara-search-container">
    <input
        type="text"
        placeholder="Search garage by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="user-gara-search"
    />
    <span className="user-gara-search-icon"><Search size={18} color="#888" /></span>
</div>


    <select value={selectedState} onChange={handleStateChange} className="user-gara-select">
        <option value="">Select State</option>
        {states.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
        ))}
    </select>

    <select value={selectedCity} onChange={handleCityChange} className="user-gara-select">
        <option value="">Select City</option>
        {cities.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
        ))}
    </select>

    <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="user-gara-select">
        <option value="">Select Area</option>
        {areas.map((a) => (
            <option key={a._id} value={a._id}>{a.name}</option>
        ))}
    </select>

    <button
        onClick={() => {
            setSearchText("");
            setSelectedState("");
            setSelectedCity("");
            setSelectedArea("");
            setCities([]);
            setAreas([]);
        }}
        className="user-gara-clear-btn"
    >
        Clear Filters
    </button>
</div>


            <div className="user-gara-list">
                {filteredGarages.length === 0 ? (
                    <p>No garages found.</p>
                ) : (
                    filteredGarages.map((garage) => (
                        <div key={garage._id} className="user-gara-card">
                            <img src={garage.garageURL} alt={garage.name} className="user-gara-image" />
                            <div className="user-gara-info">
                                <h3 className="user-gara-name">{garage.name}</h3>
                                <p className="user-gara-owner">Owner: {garage.owner}</p>
                                <p className="user-gara-contact">📍 {garage.areaId?.name}, {garage.cityId?.name}, {garage.stateId?.name}</p>
                                <p className="user-gara-contact">📞 {garage.phoneno}</p>
                                <p className="user-gara-contact">📧 {garage.email}</p>
                                <div className="user-gara-btns">
                                    <Link to={`/user/garagedetail/${garage._id}`} className="user-gara-detail-btn">
                                        View Details
                                    </Link>
                                    <button onClick={() => handleSelectGarage(garage)} className="user-gara-detail-btn">
                                        Select Garage
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};




