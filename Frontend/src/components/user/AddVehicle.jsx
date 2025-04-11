// import { useState } from "react";
// import axios from "axios";

// export const AddVehicle = () => {
//   const [vehicle, setVehicle] = useState({
//     userId: localStorage.getItem("id"), // Assuming user is logged in
//     model: "",
//     mfgYear: "",
//     category: "",
//     licensePlate:""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setVehicle({ ...vehicle, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.post("/vehicle/addvehicle", vehicle);
//       setMessage(response.data.message);
//       setVehicle({ userId: localStorage.getItem("id"), model: "", mfgYear: "", category: "", licensePlate: "" });
//     } catch (error) {
//       setMessage("Error adding vehicle. Please try again.");
//       console.error("Error:", error.response?.data?.message || error.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{
//       maxWidth: "400px",
//       margin: "50px auto",
//       padding: "20px",
//       borderRadius: "10px",
//       backgroundColor: "#fff",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     }}>
//       <h2 style={{ marginBottom: "15px", color: "#333", textAlign: "center" }}>
//         Add Your Vehicle Data
//       </h2>
//       {message && <p style={{ color: "green", marginBottom: "10px", textAlign: "center" }}>{message}</p>}
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px",marginTop:"20px" }}>

//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Vehicle Model:</label>
//           <input
//             type="text"
//             name="model"
//             placeholder="Example: i10, WagonR, etc."
//             value={vehicle.model}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//               fontSize: "16px",
//             }}
//           />
//         </div>

//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <label style={{ marginBottom: "5px", fontWeight: "bold" }}>MFG Year:</label>
//           <input
//             type="number"
//             name="mfgYear"
//             placeholder="Manufacturing Year"
//             value={vehicle.mfgYear}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//               fontSize: "16px",
//             }}
//           />
//         </div>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <label style={{ marginBottom: "5px", fontWeight: "bold" }}>license Plate:</label>
//           <input
//             type="text"
//             name="licensePlate"
//             placeholder="License Plate"
//             value={vehicle.licensePlate}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//               fontSize: "16px",
//             }}
//           />
//         </div>

//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Vehicle Type:</label>
//           <select
//             name="category"
//             value={vehicle.category}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//               fontSize: "16px",
//             }}
//           >
//             <option value="">Select Vehicle Type</option>
//             <option value="two wheeler">Two Wheeler</option>
//             <option value="three Wheeler">Three Wheeler</option>
//             <option value="Four Wheeler">Four Wheeler</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           style={{
//             padding: "12px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//           }}
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add Vehicle"}
//         </button>
//       </form>
//     </div>
//   );
// };



import { useState } from "react";
import axios from "axios";
import "../../assets/css/addvehicle.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddVehicle = () => {
    const [vehicle, setVehicle] = useState({
        userId: localStorage.getItem("id"),
        make: "",
        model: "",
        mfgYear: "",
        category: "",
        licensePlate: "",
    });

    const [customMake, setCustomMake] = useState("");
    const [customModel, setCustomModel] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const vehicleModels = {
        Maruti: ["Swift", "Alto", "Baleno", "WagonR"],
        Honda: ["City", "Civic", "Accord", "Amaze"],
        Kia: ["Seltos", "Sonet", "Carens"],
        Hyundai: ["Creta", "i10", "i20", "Venue"],
        Toyota: ["Fortuner", "Innova", "Corolla"],
        Ford: ["Ecosport", "Figo", "Mustang"],
        Suzuki: ["Access", "Burgman"],
        Yamaha: ["FZ", "R15", "MT-15"],
        "Royal Enfield": ["Classic 350", "Meteor 350"],
        Tata: ["Nexon", "Harrier", "Safari"],
        BMW: ["X5", "X7", "320d"],
        Mercedes: ["C-Class", "E-Class", "S-Class"],
        Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "make") {
            setVehicle({ ...vehicle, make: value, model: "" });
            setCustomMake("");
        } else if (name === "model") {
            setVehicle({ ...vehicle, model: value });
            setCustomModel("");
        } else {
            setVehicle({ ...vehicle, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const finalMake = vehicle.make === "Other" ? customMake : vehicle.make;
        const finalModel = vehicle.model === "Other" ? customModel : vehicle.model;

        try {
            const res = await axios.post("/vehicle/addvehicle", {
                ...vehicle,
                make: finalMake,
                model: finalModel,
            });
            // console.log('status', res)
            if(res.status === 201){
                toast.success('Vehicle Added', {
                    position: "bottom-right",
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
                    
                }
                
                setVehicle({ userId: localStorage.getItem("id"), make: "", model: "", mfgYear: "", category: "", licensePlate: "" });
                setCustomMake("");
                setCustomModel("");
        } catch (error) {
            if(error.response){
                toast.error('vehicle not added', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            } else {
                toast.error('network error! please try again', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }
        }

        setLoading(false);
    };

    return (
        <>
            <ToastContainer
                position="bottom-right"
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
            <div className="vehicle-container">
                <h2 className="vehicle-title">Add Your Vehicle Data</h2>
                {message && <p className="vehicle-message">{message}</p>}

                <form onSubmit={handleSubmit} className="vehicle-form">
                    {/* Vehicle Make */}
                    <div className="vehicle-form-group">
                        <label>Vehicle Make:</label>
                        <select name="make" value={vehicle.make} onChange={handleChange} required>
                            <option value="">Select Vehicle Make</option>
                            {Object.keys(vehicleModels).map((make) => (
                                <option key={make} value={make}>{make}</option>
                            ))}
                            <option value="Other">Other (Enter Manually)</option>
                        </select>
                        {vehicle.make === "Other" && (
                            <input type="text" className="vehicle-custom-input" placeholder="Enter Make" value={customMake} onChange={(e) => setCustomMake(e.target.value)} required />
                        )}
                    </div>

                    {/* Vehicle Model */}
                    <div className="vehicle-form-group">
                        <label>Vehicle Model:</label>
                        {vehicle.make && vehicle.make !== "Other" ? (
                            <select name="model" value={vehicle.model} onChange={handleChange} required disabled={!vehicle.make}>
                                <option value="">Select Model</option>
                                {vehicleModels[vehicle.make]?.map((model) => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                                <option value="Other">Other (Enter Manually)</option>
                            </select>
                        ) : (
                            <input type="text" className="vehicle-custom-input" placeholder="Enter Model" value={customModel} onChange={(e) => setCustomModel(e.target.value)} required />
                        )}
                    </div>

                    {/* Manufacturing Year */}
                    <div className="vehicle-form-group">
                        <label>MFG Year:</label>
                        <input type="number" name="mfgYear" placeholder="Manufacturing Year" value={vehicle.mfgYear} onChange={handleChange} required />
                    </div>

                    {/* License Plate */}
                    <div className="vehicle-form-group">
                        <label>License Plate:</label>
                        <input type="text" name="licensePlate" placeholder="License Plate" value={vehicle.licensePlate} onChange={handleChange} required />
                    </div>

                    {/* Vehicle Type */}
                    <div className="vehicle-form-group">
                        <label>Vehicle Type:</label>
                        <select name="category" value={vehicle.category} onChange={handleChange} required>
                            <option value="">Select Vehicle Type</option>
                            <option value="two wheeler">Two Wheeler</option>
                            <option value="three Wheeler">Three Wheeler</option>
                            <option value="Four Wheeler">Four Wheeler</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="vehicle-submit-btn" disabled={loading}>
                        {loading ? "Adding..." : "Add Vehicle"}
                    </button>
                </form>
            </div>
        </>
    );
};



