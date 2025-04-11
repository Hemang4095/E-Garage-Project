import React, { useEffect, useState } from 'react'
import "../../assets/css/addgarage.css"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateMyGarage = () => {
    const id = useParams().id;

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

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => {
            const res = await axios.get("/garage/getgarageby/" + id)
            return res.data.data
        }

    })
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
            const userId = localStorage.getItem("id")
            data.userId = userId

            delete data._id; //put _id -->
            console.log(data)
            const res = await axios.put("/garage/updategarage/" + id, data)
            console.log(res.data)


            if (res.status === 200) {
                toast.success('Garage Updated..!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    onClose: () => {
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

            <div className='addgarage-container'>
                <button onClick={() => navigate(-1)} className="updategarage-go-back-button">
                    ← Go Back
                </button>
                <div className='addgarage-wrapper updategarage-wrapper'>
                    <div className="addgarage-card">
                        <div className="addgarage-header">Update Garage</div>
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
