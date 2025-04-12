import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../assets/css/adminuserlist.css"

export const RegisteredUsers = () => {
    const [users, setUsers] = useState([]);

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
                    {users
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
        </div>
    );
};

