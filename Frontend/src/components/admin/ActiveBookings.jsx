import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../assets/css/activebookings.css"

const ActiveBookings = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get("/appointment/getallappointments");
            const active = res.data.data.filter(item =>
                ["pending", "booked", "inProgress", "rescheduled"].includes(item.status)
            );
            setAppointments(active);
        } catch (err) {
            toast.error("Error fetching appointments");
        }
    };

    const deleteAppointment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;
        try {
            await axios.delete(`/appointment/delete/${id}`);
            toast.success("Appointment deleted successfully");
            fetchAppointments();
        } catch (err) {
            toast.error("Error deleting appointment");
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="admin-active-book-container">
            <h2 className="admin-active-book-title">Active Bookings</h2>
            <table className="admin-active-book-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Garage</th>
                        <th>Vehicle</th>
                        <th>Services</th>
                        <th>Date</th>
                        <th>Final Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? currentItems.map((appointment) => (
                        <tr key={appointment._id}>
                            <td>{appointment.userId?.firstname || "N/A"}</td>
                            <td>{appointment.garageownerId?.name || "N/A"}</td>
                            <td>{appointment.vehicleId?.model || "N/A"}</td>
                            <td>
                                {appointment.serviceId.map(service => service.name).join(", ")}
                            </td>
                            <td>{appointment.appointmentDate}</td>
                            <td>₹{appointment.finalPrice}</td>
                            <td>
                                <span className={`admin-active-book-status admin-active-book-${appointment.status}`}>
                                    {appointment.status}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="admin-active-book-delete-btn"
                                    onClick={() => deleteAppointment(appointment._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="8" className="admin-active-book-no-data">No active bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="admin-app-book-pagination">
                {Array.from({ length: Math.ceil(appointments.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`admin-book-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>


        </div>
    );
};

export default ActiveBookings;
