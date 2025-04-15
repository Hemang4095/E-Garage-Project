
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/myappointments.css";
import Payment from "../payment/payment";
import { Link } from "react-router-dom";

export const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("id");

  const fetchAppointments = () => {
    if (userId) {
      axios
        .get(`/appointment/getappointmentbyuserid/${userId}`)
        .then((res) => setAppointments(res.data.data))
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePaymentSuccess = () => {
    fetchAppointments();
  };


  const getVehicleStatusLabel = (status) => {
    if (status === "ingarage") {
      return <span className="vehicle-status status-in-garage">🏠 In Garage</span>;
    } else if (status === "returned") {
      return <span className="vehicle-status status-returned">✅ Returned</span>;
    } else {
      return <span className="vehicle-status status-not-received">❌ Pending Arrival</span>;
    }
  };

  return (
    <div className="my-appoint-container">
      <h2 className="my-appoint-heading">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="my-noappoint-para">No appointments found.</p>
      ) : (
        <table className="my-appoint-table">
          <thead>
            <tr>
              <th>Services</th>
              <th>Garage</th>
              <th>Garage Owner</th>
              <th>Vehicle</th>
              <th>LicensePlate</th>
              <th>Final Price</th>
              <th>Appointment Date</th>
              <th>Service Status</th>
              <th>Paid</th>
              <th>Vehicle Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>
                  {appt.serviceId.map((service) => (
                    <div key={service._id}>{service.name}</div>
                  ))}
                </td>
                <td>{appt.garageownerId?.name || "N/A"}</td>
                <td>{appt.garageownerId?.userId?.firstname || "N/A"}</td>
                <td>
                  {appt.vehicleId?.make || "N/A"} {appt.vehicleId?.model || "N/A"}
                </td>
                <td>{appt.vehicleId?.licensePlate || "N/A"}</td>
                <td>₹{appt.finalPrice}</td>
                <td>
                  {new Date(appt.appointmentDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className={`my-appoint-status-${appt.status.toLowerCase()}`}>
                  {appt.status}
                </td>
                <td>{appt.isPaid ? "✅ Yes" : "❌ No"}</td>
                <td>{getVehicleStatusLabel(appt.vehicleStatus)}</td>
                <td>{appt.reason || "-"}</td>
                <td>
                  {appt.status === "completed" && !appt.isPaid && (
                    <Payment
                      appointmentId={appt._id}
                      userId={userId}
                      amount={appt.finalPrice * 100}
                      onSuccess={handlePaymentSuccess}
                    />
                  )}
                  {appt.status === "completed" && appt.isPaid && (
                    <Link
                      to={`/user/invoice/${appt._id}`}
                      className="my-invoice-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🧾 View Invoice
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

