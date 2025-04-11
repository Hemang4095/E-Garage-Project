// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/user-payments.css";

// const UserPayments = () => {
//     const [payments, setPayments] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const paymentsPerPage = 10;

//     useEffect(() => {
//         const userId = localStorage.getItem("id");

//         if (!userId) return;

//         axios
//             .get(`/payment/getpaymentbyuserid/${userId}`)
//             .then((res) => setPayments(res.data.data))
//             .catch((err) => console.error("Error fetching payment data:", err));
//     }, []);

//     const indexOfLast = currentPage * paymentsPerPage;
//     const indexOfFirst = indexOfLast - paymentsPerPage;
//     const currentPayments = payments.slice(indexOfFirst, indexOfLast);
//     const totalPages = Math.ceil(payments.length / paymentsPerPage);

//     const changePage = (page) => setCurrentPage(page);

//     return (
//         <div className="userpay-container">
//             <h2>User Payment History</h2>

//             <table className="userpay-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Appointment ID</th>
//                         <th>Payment ID</th>
//                         <th>Order ID</th>
//                         <th>Amount (₹)</th>
//                         <th>Status</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentPayments.map((payment, index) => (
//                         <tr key={payment._id}>
//                             <td>{indexOfFirst + index + 1}</td>
//                             <td>{payment.appointmentId?._id}</td>
//                             <td>{payment.razorpay_payment_id}</td>
//                             <td>{payment.razorpay_order_id}</td>
//                             <td>{payment.amount/100}</td>
//                             <td className="userpay-paid">Paid</td>
//                             <td>{new Date(payment.createdAt).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="userpay-pagination">
//                 {[...Array(totalPages).keys()].map((num) => (
//                     <button
//                         key={num}
//                         className={`userpay-page-btn ${currentPage === num + 1 ? "active" : ""}`}
//                         onClick={() => changePage(num + 1)}
//                     >
//                         {num + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UserPayments;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/user-payments.css";

// const UserPayments = () => {
//     const [payments, setPayments] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const paymentsPerPage = 10;

//     useEffect(() => {
//         const userId = localStorage.getItem("id");
//         if (!userId) return;

//         axios
//             .get(`/payment/getpaymentbyuserid/${userId}`)
//             .then((res) => setPayments(res.data.data))
//             .catch((err) => console.error("Error fetching payment data:", err));
//     }, []);

//     const indexOfLast = currentPage * paymentsPerPage;
//     const indexOfFirst = indexOfLast - paymentsPerPage;
//     const currentPayments = payments.slice(indexOfFirst, indexOfLast);
//     const totalPages = Math.ceil(payments.length / paymentsPerPage);

//     const changePage = (page) => setCurrentPage(page);

//     return (
//         <div className="userpay-container">
//             <h2 className="userpay-title">Your Payment History</h2>

//             <table className="userpay-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Garage</th>
//                         <th>Service(s)</th>
//                         <th>Amount (₹)</th>
//                         <th>Order ID</th>
//                         <th>Payment ID</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentPayments.map((payment, index) => {
//                         const { appointmentId } = payment;
//                         const garageName = appointmentId?.garageownerId?.name || "N/A";
//                         const services = appointmentId?.serviceId || [];

//                         return (
//                             <tr key={payment._id}>
//                                 <td>{indexOfFirst + index + 1}</td>
//                                 <td>{garageName}</td>
//                                 <td>
//                                     {services.map((s) => (
//                                         <div key={s._id}>{s.name}</div>
//                                     ))}
//                                 </td>
//                                 <td>₹{payment.amount/100}</td>
//                                 <td>{payment.razorpay_order_id}</td>
//                                 <td>{payment.razorpay_payment_id}</td>
//                                 <td>{new Date(payment.createdAt).toLocaleString()}</td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             <div className="userpay-pagination">
//                 {[...Array(totalPages).keys()].map((num) => (
//                     <button
//                         key={num}
//                         className={`userpay-page-btn ${currentPage === num + 1 ? "active" : ""}`}
//                         onClick={() => changePage(num + 1)}
//                     >
//                         {num + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UserPayments;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/user-payments.css";

// const UserPayments = () => {
//     const [payments, setPayments] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const paymentsPerPage = 10;

//     useEffect(() => {
//         const userId = localStorage.getItem("id");
//         if (!userId) return;

//         axios
//             .get(`/payment/getpaymentbyuserid/${userId}`)
//             .then((res) => setPayments(res.data.data))
//             .catch((err) => console.error("Error fetching payment data:", err));
//     }, []);

//     const indexOfLast = currentPage * paymentsPerPage;
//     const indexOfFirst = indexOfLast - paymentsPerPage;
//     const currentPayments = payments.slice(indexOfFirst, indexOfLast);
//     const totalPages = Math.ceil(payments.length / paymentsPerPage);

//     const changePage = (page) => setCurrentPage(page);

//     return (
//         <div className="userpay-container">
//             <h2 className="userpay-title">Your Payment History</h2>

//             <table className="userpay-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Garage Owner</th>
//                         <th>Service(s)</th>
//                         <th>Vehicle</th>
//                         <th>Amount (₹)</th>
//                         <th>Order ID</th>
//                         <th>Payment ID</th>
//                         <th>Status</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentPayments.map((payment, index) => {
//                         const { appointmentId } = payment;
//                         const garageName = appointmentId?.garageownerId?.name || "N/A";
//                         const services = appointmentId?.serviceId || [];
//                         const vehicle = appointmentId?.vehicleId;

//                         return (
//                             <tr key={payment._id}>
//                                 <td>{indexOfFirst + index + 1}</td>
//                                 <td>{garageName}</td>
//                                 <td>{services.map(s => s?.name).join(", ")}</td>
//                                 <td>
//                                     {vehicle
//                                         ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})`
//                                         : "N/A"}
//                                 </td>
//                                 <td>₹{(payment.amount / 100).toFixed(2)}</td>
//                                 <td>{payment.razorpay_order_id}</td>
//                                 <td>{payment.razorpay_payment_id}</td>
//                                 <td><span className="userpay-paid">Paid</span></td>
//                                 <td>{new Date(payment.createdAt).toLocaleString()}</td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             {totalPages > 1 && (
//                 <div className="userpay-pagination">
//                     {[...Array(totalPages).keys()].map((num) => (
//                         <button
//                             key={num}
//                             className={`userpay-page-btn ${currentPage === num + 1 ? "active" : ""}`}
//                             onClick={() => changePage(num + 1)}
//                         >
//                             {num + 1}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserPayments;





import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/user-payments.css";

const UserPayments = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const paymentsPerPage = 10;

    useEffect(() => {
        const userId = localStorage.getItem("id");
        if (!userId) return;

        axios
            .get(`/payment/getpaymentbyuserid/${userId}`)
            .then((res) => {
                setPayments(res.data.data);
                setFilteredPayments(res.data.data); // default display
            })
            .catch((err) => console.error("Error fetching payment data:", err));
    }, []);

    useEffect(() => {
        let filtered = [...payments];

        if (statusFilter !== "All") {
            filtered = filtered.filter(p => p.status?.toLowerCase() === statusFilter.toLowerCase());
        }

        if (searchTerm.trim()) {
            const lower = searchTerm.toLowerCase();
            filtered = filtered.filter(p => {
                const garage = p.appointmentId?.garageownerId?.name?.toLowerCase() || "";
                const order = p.razorpay_order_id?.toLowerCase() || "";
                const pay = p.razorpay_payment_id?.toLowerCase() || "";
                const serviceNames = (p.appointmentId?.serviceId || []).map(s => s.name.toLowerCase()).join(", ");
                return (
                    garage.includes(lower) ||
                    order.includes(lower) ||
                    pay.includes(lower) ||
                    serviceNames.includes(lower)
                );
            });
        }

        setFilteredPayments(filtered);
        setCurrentPage(1); // reset to page 1 after search/filter
    }, [searchTerm, statusFilter, payments]);

    const indexOfLast = currentPage * paymentsPerPage;
    const indexOfFirst = indexOfLast - paymentsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    const changePage = (page) => setCurrentPage(page);

    return (
        <div className="userpay-container">
            <h2 className="userpay-title">Your Payment History</h2>

            {/* 🔍 Search + Filter UI */}
            <div className="userpay-filters">
                <input
                    type="text"
                    placeholder="Search Garage, Order ID, Service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="userpay-search"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="userpay-dropdown"
                >
                    <option value="All">All Status</option>
                    <option value="Success">Success</option>
                    <option value="Failure">Failure</option>
                </select>
            </div>

            <table className="userpay-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Garage Owner</th>
                        <th>Service(s)</th>
                        <th>Vehicle</th>
                        <th>Amount (₹)</th>
                        <th>Order ID</th>
                        <th>Payment ID</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPayments.length > 0 ? (
                        currentPayments.map((payment, index) => {
                            const { appointmentId } = payment;
                            const garageName = appointmentId?.garageownerId?.name || "N/A";
                            const services = appointmentId?.serviceId || [];
                            const vehicle = appointmentId?.vehicleId;

                            return (
                                <tr key={payment._id}>
                                    <td>{indexOfFirst + index + 1}</td>
                                    <td>{garageName}</td>
                                    <td>{services.map(s => s?.name).join(", ")}</td>
                                    <td>
                                        {vehicle
                                            ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})`
                                            : "N/A"}
                                    </td>
                                    <td>₹{(payment.amount / 100).toFixed(2)}</td>
                                    <td>{payment.razorpay_order_id}</td>
                                    <td>{payment.razorpay_payment_id}</td>
                                    <td><span className={`userpay-${payment.status}`}>{payment.status}</span></td>
                                    <td>{new Date(payment.createdAt).toLocaleString()}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center" }}>
                                No matching payments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="userpay-pagination">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            className={`userpay-page-btn ${currentPage === num + 1 ? "active" : ""}`}
                            onClick={() => changePage(num + 1)}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserPayments;
