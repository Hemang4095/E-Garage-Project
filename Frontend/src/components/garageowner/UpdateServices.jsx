import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

export const UpdateServices = () => {
  const id = useParams().id;

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/service/getservice/" + id)
      return res.data.data
    }
  }
  );


  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id")
      data.userId = userId

      delete data._id; //put _id -->
      console.log(data)
      const res = await axios.put("/service/updateservice/" + id, data)
      console.log(res.data)

      console.log(res)
      if (res.status === 200) {
        toast.success("Service updated successfully!", {
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
          ? "Service not updated!"
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
    <>
      <div className="addserv-container updateserv-container">
        <button onClick={() => navigate(-1)} className="updateserv-go-back-button">
          ← Go Back
        </button>

        <h1 className="addserv-title">Update Service</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit(submitHandler)} className="addserv-form-box updateserv-form-box">

          <label className='update-form-label'>Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="addserv-input-field"
          />
          {errors.name && (
            <p className="addserv-err-text">
              {errors.name.message}
            </p>
          )}



          <label className='update-form-label'>Description</label>
          <input
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
            className="addserv-input-field"

          />
          {errors.description && (
            <p className="addserv-err-text">
              {errors.description.message}
            </p>
          )}


          <label className='update-form-label'>Category</label>
          <input
            {...register("category", { required: "Category is required" })}
            placeholder="Category"
            className="addserv-input-field"

          />
          {errors.category && (
            <p className="addserv-err-text">
              {errors.category.message}
            </p>
          )}


          <label className='update-form-label'>Price</label>
          <input
            type="number"
            {...register("allInclusivePrice", { required: "Price is required", min: 1 })}
            placeholder="Price"
            className="addserv-input-field"

          />
          {errors.allInclusivePrice && (
            <p className="addserv-err-text">
              {errors.allInclusivePrice.message}
            </p>
          )}



          <label className='update-form-label'>Duration</label>
          <input
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: 1
            })}
            placeholder="Duration (mins)"
            className="addserv-input-field"

          />
          {errors.duration && (
            <p className="addserv-err-text">
              {errors.duration.message}
            </p>
          )}


          <label className='update-form-label'>Ratings</label>
          <input
            type="number"
            step="0.1"
            {...register("ratings", {
              required: "Ratings are required",
              min: 0,
              max: 5
            })}
            placeholder="Ratings (0-5)"
            className="addserv-input-field"

          />
          {errors.ratings && (
            <p className="addserv-err-text">
              {errors.ratings.message}
            </p>
          )}


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
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              Available
            </label>
          </div>

          <button type="submit" className="addserv-submit-btn">Update Service</button>
        </form>

      </div>
    </>
  )
}
