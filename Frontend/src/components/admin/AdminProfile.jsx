import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../assets/css/userprofile.css"
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const AdminProfile = () => {

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ firstname: '', contactno: '', email: '', userURL: '' });
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    console.log("Navbar re-rendered. User:", user);

  }, [user]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`/user/${userId}`);
        if (response.data && response.data.data) {
          setUser(response.data.data);
          setFormData({
            firstname: response.data.data.firstname || '',
            contactno: response.data.data.contactno || '',
            email: response.data.data.email || '',
            userURL: response.data.data.userURL || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("firstname", formData.firstname);
      updatedData.append("contactno", formData.contactno);
      if (selectedImage) {
        updatedData.append("image", selectedImage); // "image" matches the multer config
      }

      const response = await axios.put(`/updateuserby/${userId}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success('Profile Updated Successfully!', {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/admin")

        });


        // setUser(response.data.updatedUser);
        setUser((prev) => ({ ...prev, ...e }));


      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };


  const userInitial = user?.firstname ? user.firstname.charAt(0) : "U";
  const defaultAvatar = `https://ui-avatars.com/api/?name=${userInitial}&background=random&color=fff&size=100`;

  return (
    <>

      <div style={{ minHeight: "90%" }}>
        <ToastContainer
          position="top-right"
          autoClose={1200}
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
        <div className="profile-container">
          <button onClick={() => navigate(-1)} className="user-profile-go-back-button">
            ← Go Back
          </button>
          <h2 className='protitle'>My Profile</h2>
          <div className="profile-card userprocard">
            <div>

              <img
                src={user?.image ? user.image : defaultAvatar}
                alt="Profile"
                className="rounded-circle proimg"
                width="100"
                height="100"
              />
              <div className='proname'>{formData.firstname}</div>
            </div>

            <div className='proformdiv'>

              <form onSubmit={handleUpdate} className='proform'>
                <div className='prodata'>
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='prodata'>
                  <label>Email (Cannot be changed):</label>
                  <input type="email" value={formData.email} disabled style={{ opacity: "0.6" }} />
                </div>

                <div className='prodata'>
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="contactno"
                    value={formData.contactno}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='prodata'>
                  <label>Profile Picture:</label>
                  <input type="file" onChange={handleImageChange} accept="image/*" />
                </div>

                <button type="submit" className='probtn'>Update Profile</button>
              </form>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}
