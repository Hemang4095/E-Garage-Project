import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/admingaragelist.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GarageList = () => {
    const [garages, setGarages] = useState([]);

    useEffect(() => {
        getAllGarages();
    }, []);

    const getAllGarages = async () => {
        const res = await axios.get("/garage/getallgarages");
        setGarages(res.data.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/garage/deletegarage/${id}`);
        toast.error("Garage deleted");
        getAllGarages();
    };

    const handleApprove = async (id, email) => {
        await axios.put(`/garage/updategarage/${id}`, {
            avaliability_status: true,
        });
        await axios.post("/mail/send-status-mail", {
            to: email,
            status: "approved",
        });
        toast.success("Garage approved & mail sent");
        getAllGarages();
    };

    const handleInapprove = async (id, email) => {
        await axios.put(`/garage/updategarage/${id}`, {
            avaliability_status: false,
        });
        await axios.post("/mail/send-status-mail", {
            to: email,
            status: "inapproved",
        });
        toast.warning("Garage disapproved & mail sent");
        getAllGarages();
    };

    return (
        <div className="admin-gara-list-container">
            <ToastContainer />
            <h2 className="admin-gara-list-title">Garage List</h2>
            <div className="admin-gara-list-table-wrapper">
                <table className="admin-gara-list-table">
                    <thead>
                        <tr>
                            <th>Garage Name</th>
                            <th>Owner</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Area</th>
                            <th>Status</th>
                            <th>Opening Time</th>
                            <th>Email</th>
                            <th>Map</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garages.map((garage) => (
                            <tr key={garage._id}>
                                <td>{garage.name}</td>
                                <td>{garage.owner}</td>
                                <td>{garage.stateId?.name || "N/A"}</td>
                                <td>{garage.cityId?.name || "N/A"}</td>
                                <td>{garage.areaId?.name || "N/A"}</td>
                                <td>
                                    <span
                                        className={`admin-gara-list-status ${
                                            garage.avaliability_status ? "active" : "inactive"
                                        }`}
                                    >
                                        {garage.avaliability_status ? "Available" : "Unavailable"}
                                    </span>
                                </td>
                                <td>{garage.openingHours}</td>
                                <td>{garage.email}</td>
                                <td>
                                    {garage.latitude && garage.longitude ? (
                                        <a
                                            href={`https://www.google.com/maps?q=${garage.latitude},${garage.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View on map
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="admin-gara-list-actions">
                                    <button
                                        className="admin-gara-list-btn delete"
                                        onClick={() => handleDelete(garage._id)}
                                    >
                                        Delete
                                    </button>
                                    {!garage.avaliability_status ? (
                                        <button
                                            className="admin-gara-list-btn approve"
                                            onClick={() =>
                                                handleApprove(garage._id, garage.email)
                                            }
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            className="admin-gara-list-btn inapprove"
                                            onClick={() =>
                                                handleInapprove(garage._id, garage.email)
                                            }
                                        >
                                            Inapprove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
