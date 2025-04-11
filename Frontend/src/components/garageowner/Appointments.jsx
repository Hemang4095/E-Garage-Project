import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/appointments.css";

export const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`/appointment/getappointmentbygarageowneruserid/${userId}`);
            setAppointments(response.data.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const getNextStatus = (currentStatus) => {
        const statusOrder = ["pending", "booked", "inProgress", "completed"];
        const currentIndex = statusOrder.indexOf(currentStatus);
        return currentIndex !== -1 && currentIndex < statusOrder.length - 1
            ? statusOrder[currentIndex + 1]
            : currentStatus;
    };

    const updateStatus = async (appointmentId, currentStatus, action) => {
        let newStatus = currentStatus;

        if (action === "reject") {
            newStatus = "rejected";
        } else if (action === "reschedule") {
            newStatus = "pending";
        } else {
            newStatus = getNextStatus(currentStatus);
        }

        try {
            await axios.put(`/appointment/updateappointmentstatus/${appointmentId}/status`, { status: newStatus });
            fetchAppointments();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const deleteAppointment = async (appointmentId) => {
        try {
            await axios.delete(`/appointment/deleteappointment/${appointmentId}`);
            fetchAppointments();
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const markAsReceived = async (appointmentId) => {
        try {
            await axios.put(`/appointment/updatevehiclereturnstatus/${appointmentId}`, {
                vehicleStatus: "ingarage",
            });
            fetchAppointments();
        } catch (error) {
            console.error("Error marking vehicle as received:", error);
        }
    };


    const markAsReturned = async (appointmentId) => {
        try {
            await axios.put(`/appointment/updatevehiclereturnstatus/${appointmentId}`, {
                vehicleStatus: "returned",
            });
            fetchAppointments();
        } catch (error) {
            console.error("Error marking vehicle as returned:", error);
        }
    };

    return (
        <div className="own-appoint-container">
            <h2 className="own-appoint-title">Garage Owner's Appointments</h2>
            <div className="own-appoint-table-container">
                <table className="own-appoint-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Service</th>
                            <th>Vehicle</th>
                            <th>License Plate</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>Paid</th>
                            <th>Vehicle Status</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.userId?.firstname || "N/A"}</td>
                                    <td>{appointment.serviceId?.map(service => service.name).join(", ") || "N/A"}</td>
                                    <td>{appointment.vehicleId?.make} {appointment.vehicleId?.model}</td>
                                    <td>{appointment.vehicleId?.licensePlate}</td>
                                    <td>{new Date(appointment.appointmentDate).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}</td>
                                    <td className={`own-appoint-status-${appointment.status.toLowerCase()}`}>{appointment.status}</td>
                                    <td>{appointment.isPaid ? "Yes" : "No"}</td>
                                    <td>{appointment.vehicleStatus}</td>
                                    <td>{appointment.reason || "N/A"}</td>
                                    <td>
                                        {appointment.status === "pending" && appointment.vehicleStatus === "ingarage" && (
                                            <div className="own-appoint-both-btn">
                                                <button
                                                    className="own-appoint-status-btn"
                                                    onClick={() => updateStatus(appointment._id, appointment.status, "next")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="own-appoint-reject-btn"
                                                    onClick={() => updateStatus(appointment._id, appointment.status, "reject")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {appointment.status !== "pending" && appointment.status !== "completed" && (
                                            <button
                                                className="own-appoint-status-btn"
                                                onClick={() => updateStatus(appointment._id, appointment.status, "next")}
                                            >
                                                Next Stage
                                            </button>
                                        )}

                                        {appointment.status === "rejected" && (
                                            <button
                                                className="own-appoint-status-btn"
                                                onClick={() => updateStatus(appointment._id, appointment.status, "reschedule")}
                                            >
                                                Reschedule
                                            </button>
                                        )}


                                        {(() => {
                                            const appointmentDate = new Date(appointment.appointmentDate);
                                            appointmentDate.setHours(0, 0, 0, 0); // normalize to start of day
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0); // normalize to start of day
                                            const isTodayOrPast = appointmentDate <= today;

                                            if (appointment.status === "pending" && !appointment.isPaid && !appointment.vehicleStatus && isTodayOrPast) {
                                                return (
                                                    <button
                                                        className="own-appoint-status-btn"
                                                        onClick={() => markAsReceived(appointment._id)}
                                                    >
                                                        Mark as Received
                                                    </button>
                                                );
                                            }

                                            if (appointment.isPaid && appointment.vehicleStatus === "ingarage") {
                                                return (
                                                    <button
                                                        className="own-appoint-status-btn"
                                                        onClick={() => markAsReturned(appointment._id)}
                                                    >
                                                        Mark as Returned
                                                    </button>
                                                );
                                            }

                                            return null;
                                        })()}


                                        {/* <button
                                            className="own-appoint-delete-btn"
                                            onClick={() => deleteAppointment(appointment._id)}
                                        >
                                            Delete
                                        </button> */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" style={{ textAlign: "center" }}>
                                    No appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
