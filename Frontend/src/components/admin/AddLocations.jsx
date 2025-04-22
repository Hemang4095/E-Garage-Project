import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/adminaddlocation.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const AddLocations = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  const showAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
    });
  };
  

  useEffect(() => {
    axios
      .get("/state/getallstates")
      .then((res) => setStates(res.data.data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      axios
        .get(`/city/getcitybystate/${selectedStateId}`)
        .then((res) => setCities(res.data.data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedStateId]);

  useEffect(() => {
    if (selectedCityId) {
      axios
        .get(`/area/getareabycityid/${selectedCityId}`)
        .then((res) => setAreas(res.data.data))
        .catch((err) => console.error("Error fetching areas:", err));
    }
  }, [selectedCityId]);

  const addState = async () => {
    if (!newState.trim()) return;
    try {
      const res = await axios.post("/state/addstate", { name: newState });
      setStates((prev) => [...prev, res.data.data]);
      setNewState("");
      showAlert("State added successfully!");
    } catch (err) {
      console.error("Error adding state:", err);
    }
  };

  const addCity = async () => {
    if (!newCity.trim() || !selectedStateId) return;
    try {
      const res = await axios.post("/city/addcity", {
        name: newCity,
        stateId: selectedStateId,
      });
      setCities((prev) => [...prev, res.data.data]);
      setNewCity("");
      showAlert("City added successfully!");
    } catch (err) {
      console.error("Error adding city:", err);
    }
  };

  const addArea = async () => {
    if (!newArea.trim() || !newPincode.trim() || !selectedCityId) return;
    const selectedCity = cities.find((c) => c._id === selectedCityId);
    if (!selectedCity) return;

    try {
      const res = await axios.post("/area/addarea", {
        name: newArea,
        pincode: newPincode,
        cityId: selectedCityId,
        stateId: selectedCity.stateId,
      });
      setAreas((prev) => [...prev, res.data.data]);
      setNewArea("");
      setNewPincode("");
      showAlert("Area added successfully!");
    } catch (err) {
      console.error("Error adding area:", err);
    }
  };

  return (
    <div className="admin-addloc-container">
      <h2 className="admin-addloc-title">Area Management</h2>

      <div className="admin-addloc-section">
        <h4>Add State</h4>
        <div className="admin-addloc-input-group">
          <input
            className="admin-addloc-input"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="Enter state name"
          />
          <button className="admin-addloc-button" onClick={addState}>
            Add State
          </button>
        </div>
      </div>

      <div className="admin-addloc-section">
        <h4>Select State</h4>
        <select
          className="admin-addloc-select"
          value={selectedStateId}
          onChange={(e) => {
            setSelectedStateId(e.target.value);
            setSelectedCityId("");
            setCities([]);
            setAreas([]);
          }}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-addloc-section">
        <h4>Add City</h4>
        <div className="admin-addloc-input-group">
          <input
            className="admin-addloc-input"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="admin-addloc-button" onClick={addCity}>
            Add City
          </button>
        </div>
      </div>

      <div className="admin-addloc-section">
        <h4>Select City</h4>
        <select
          className="admin-addloc-select"
          value={selectedCityId}
          onChange={(e) => {
            setSelectedCityId(e.target.value);
            setAreas([]);
          }}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-addloc-section">
        <h4>Add Area</h4>
        <div className="admin-addloc-area-group">
          <input
            className="admin-addloc-input addloc-area-name"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Enter area name"
          />
          <input
            className="admin-addloc-input addloc-pincode"
            value={newPincode}
            onChange={(e) => setNewPincode(e.target.value)}
            placeholder="Enter pincode"
          />
          <button className="admin-addloc-button" onClick={addArea}>
            Add Area
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
