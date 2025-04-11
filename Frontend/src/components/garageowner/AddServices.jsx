import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../../src/assets/css/addservice.css";

export const AddServices = () => {
  const navigate = useNavigate();
  const [garages, setGarages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Fetch garages owned by the logged-in user
  useEffect(() => {
    const fetchGarages = async () => {
      const userId = localStorage.getItem("id");
      try {
        const res = await axios.get(`/garage/getgaragesbyuserid/${userId}`);
        setGarages(res.data.data);
      } catch (err) {
        console.error("Failed to fetch garages:", err);
      }
    };
    fetchGarages();
  }, []);

  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id"); // Get userId
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "image") formData.append(key, data[key]);
      });

      // Append image if exists
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      // Append userId
      formData.append("userId", userId);

      const res = await axios.post("/service/addwithfile", formData);
      if (res.status === 200) {
        toast.success("Service added successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
          onClose: () => navigate("/garageowner/availableservices")
        });
      }
    } catch (error) {
      toast.error(
        error.response
          ? "Service not added!"
          : "Network error! Please try again later",
        {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce
        }
      );
    }
  };

  return (
    <div className="addserv-container">
      <h1 className="addserv-title">Add Service</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="addserv-form-box">
        {/* Garage Selection Dropdown */}
        <select
          {...register("garageId", { required: "Garage is required" })}
          className="addserv-input-field"
        >
          <option value="">Select Garage</option>
          {garages.map((garage) => (
            <option key={garage._id} value={garage._id}>
              {garage.name}
            </option>
          ))}
        </select>
        {errors.garageId && <p className="addserv-err-text">{errors.garageId.message}</p>}

        {/* Other Input Fields */}
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="addserv-input-field"
        />
        {errors.name && <p className="addserv-err-text">{errors.name.message}</p>}

        <input
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          className="addserv-input-field"
        />
        {errors.description && <p className="addserv-err-text">{errors.description.message}</p>}

        <input
          {...register("category", { required: "Category is required" })}
          placeholder="Category"
          className="addserv-input-field"
        />
        {errors.category && <p className="addserv-err-text">{errors.category.message}</p>}

        <input
          type="number"
          {...register("allInclusivePrice", { required: "Price is required", min: 1 })}
          placeholder="Price"
          className="addserv-input-field"
        />
        {errors.allInclusivePrice && <p className="addserv-err-text">{errors.allInclusivePrice.message}</p>}

        <input
          type="number"
          {...register("duration", { required: "Duration is required", min: 1 })}
          placeholder="Duration (mins)"
          className="addserv-input-field"
        />
        {errors.duration && <p className="addserv-err-text">{errors.duration.message}</p>}

        <input
          type="file"
          {...register("image", { required: "Image is required" })}
          className="addserv-input-field"
        />
        {errors.image && <p className="addserv-err-text">{errors.image.message}</p>}

        <input
          type="number"
          step="0.1"
          {...register("ratings", { required: "Ratings are required", min: 0, max: 5 })}
          placeholder="Ratings (0-5)"
          className="addserv-input-field"
        />
        {errors.ratings && <p className="addserv-err-text">{errors.ratings.message}</p>}

        {/* Checkbox for Availability */}
        <div className="addserv-check-container">
          <input
            type="checkbox"
            {...register("availability")}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer"
            }}
            className="addserv-input-field"
          />
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>Available</label>
        </div>

        <button type="submit" className="addserv-submit-btn">
          Add Service
        </button>
      </form>
    </div>
  );
};
