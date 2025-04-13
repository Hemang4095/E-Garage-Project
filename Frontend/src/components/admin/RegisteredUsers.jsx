import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../assets/css/adminuserlist.css"

export const RegisteredUsers = () => {
    const [users, setUsers] = useState([]);

    const handleStatusToggle = async (id) => {
        try {
            await axios.put(`/toggle-userstatus/${id}`);
            toast.success("User status updated");
            fetchUsers();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/users");
            setUsers(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`/user/${id}`);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (error) {
                toast.error("Error deleting user");
            }
        }
    };


    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);


    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-userlist-container">
            <h2>Registered Users</h2>
            <table className="admin-userlist-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers
                        .map(user => (
                            <tr key={user._id}>
                                <td>{user.firstname}{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.contactno}</td>
                                <td>{user.roleId?.name || "N/A"}</td>
                                <td>{user.status ? "Active" : "Inactive"}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className={`admin-userlist-statusbtn ${user.status ? "inactive" : "active"}`}
                                        onClick={() => handleStatusToggle(user._id)}
                                    >
                                        {user.status ? "Block" : "Unblock"}
                                    </button>
                                    <button
                                        className="admin-userlist-deletebtn"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="admin-userlist-pagination">
    {Array.from({ length: totalPages }, (_, index) => (
        <button
            key={index + 1}
            className={`admin-userlist-pagebtn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
        >
            {index + 1}
        </button>
    ))}
</div>
        </div>
    );
};

