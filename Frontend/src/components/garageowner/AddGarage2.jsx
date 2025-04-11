import React, { useEffect, useState } from 'react'
import "../../assets/css/addgarage.css"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AddGarage2 = () => {
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [areas, setareas] = useState([])

    const getAllStates = async () => {
        const res = await axios.get("/state/getallstates")
        setstates(res.data.data)
    }

    const getCityByStateId = async (id) => {
        const res = await axios.get("/city/getcitybystate/" + id)
        setcities(res.data.data)
    }

    const getAreaByCityId = async (id) => {
        const res = await axios.get("/area/getareabycity/" + id)
        setareas(res.data.data)
    }

    useEffect(() => {
        getAllStates()
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log('errors...', errors)

    const navigate = useNavigate()

    const validationSchema = {
        nameValidator: {
            required: {
                value: true,
                message: "garagename is required"
            },
            minLength: {
                value: 8,
                message: "minimum eight char for garagename"
            }
        },
        ownerValidator: {
            required: {
                value: true,
                message: "ownername is required"
            },
            minLength: {
                value: 3,
                message: "minimum three char for name"
            }
        },
        emailValidator: {
            required: {
                value: true,
                message: "Email is required"
            }
        },
        phonenoValidator: {
            required: {
                value: true,
                message: "phoneno is required"
            },
            pattern: {
                value: /[6-9]{1}[0-9]{9}/,
                message: "contact is not valid"
            }
        }
    }


    const submitHandler = async (data) => {

        try {
            data.userId = localStorage.getItem("id")
            // const res = await axios.post("/garage/addgarage", data)
            console.log(data)
            console.log(data.image[0])//array --> 0th index image....

            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("owner", data.owner)
            formData.append("phoneno", data.phoneno)
            formData.append("email", data.email)
            formData.append("stateId", data.stateId)
            formData.append("cityId", data.cityId)
            formData.append("areaId", data.areaId)
            formData.append("openingHours", data.openingHours)
            formData.append("latitude", data.latitude)
            formData.append("longitude", data.longitude)
            formData.append("image", data.image[0])
            formData.append("userId", data.userId)

            const res = await axios.post("/garage/addwithfile", formData)
            console.log(res) // axios res
            console.log(res.data) // api response..

            if (res.status === 200) { 
                toast.success('Garage Added..!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    onClose:() => {
                        navigate("/garageowner/mygarages")
                    }
                    });

            }

        } catch (err) {

            if (err.response) {
                toast.error('garage not added!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
            else {
                toast.error('network error! please try again', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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

            <div className='addgarage-container' style={{padding:"30px"}}>
                <div className='addgarage-wrapper'>
                    <div className="addgarage-card">
                        <div className="addgarage-header">Add Garage</div>
                        <form className="addgarage-form" onSubmit={handleSubmit(submitHandler)}>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Garage Name</label>
                                <input type="text" {...register("name", validationSchema.nameValidator)} className="addgarage-input" />
                                {errors.name && <p className="addgarage-error">{errors.name.message}</p>}

                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Owner Name</label>
                                <input type="text" {...register("owner", validationSchema.ownerValidator)} className="addgarage-input" />
                                {errors.owner && <p className="addgarage-error">{errors.owner.message}</p>}

                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Phone No</label>
                                <input type="text" {...register("phoneno", validationSchema.phonenoValidator)} className="addgarage-input" />
                                {errors.phoneno && <p className="addgarage-error">{errors.phoneno.message}</p>}

                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Email</label>
                                <input type="text" {...register("email", validationSchema.emailValidator)} className="addgarage-input" />
                                {errors.email && <p className="addgarage-error">{errors.email.message}</p>}

                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Select State</label>
                                <select {...register("stateId")} className="addgarage-select" onChange={(event) => getCityByStateId(event.target.value)}>
                                    <option>Select State</option>
                                    {states?.map((state) => (
                                        <option key={state._id} value={state._id}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Select City</label>
                                <select {...register("cityId")} className="addgarage-select" onChange={(event) => getAreaByCityId(event.target.value)}>
                                    <option>Select City</option>
                                    {cities?.map((city) => (
                                        <option key={city._id} value={city._id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Select Area</label>
                                <select {...register("areaId")} className="addgarage-select">
                                    <option>Select Area</option>
                                    {areas?.map((area) => (
                                        <option key={area._id} value={area._id}>{area.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Opening Hours</label>
                                <input type="text" {...register("openingHours")} className="addgarage-input" />
                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Latitude</label>
                                <input type="text" {...register("latitude")} className="addgarage-input" />
                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Longitude</label>
                                <input type="text" {...register("longitude")} className="addgarage-input" />
                            </div>
                            <div className="addgarage-form-group">
                                <label className="addgarage-label">Add Garage Poster</label>
                                <input type="file" {...register("image")} className="addgarage-input" />
                            </div>
                            <div className="addgarage-submit-container">
                                <input type="submit" value="Submit" className="addgarage-submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
