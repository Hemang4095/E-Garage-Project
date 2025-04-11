import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CustLoader } from '../common/CustLoader'
import "../../assets/css/garagelist.css"

export const ViewMyGarages = () => {

    const [garages, setGarages] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()

    const getAllMyGarages = async () => {

        setisLoading(true)
        const res = await axios.get("/garage/getgaragesbyuserid/" + localStorage.getItem("id"))
        console.log(res.data) //api response
        setGarages(res.data.data)
        setisLoading(false)

    }

    useEffect(() => {

        getAllMyGarages()

    }, [])


    return (
        <div style={{ textAlign: "center", marginBottom: "7rem" }}>
            {
                isLoading && <CustLoader />
            }

            <div style={{
                margin: "12px",
                backgroundColor: "#3c4056",
                padding: "12px 0px",
                fontSize: "1.5rem",
                borderRadius: "8px",
                color: "white"
            }}>
                My Garages
            </div>

            <div className='garage-container'>
                {garages?.map((gr) => (
                    <div key={gr._id} className='' style={{ backgroundColor: "#44474d", borderRadius: "8px", width: "270px" }}>
                        <div>
                            <img className='garage-image' src={gr?.garageURL} alt={gr.name} style={{ borderRadius: "20px 20px 0 0", padding: "12px" }} />
                        </div>
                        <div style={{ padding: "0px 14px 14px 14px", color: "white" }}>
                            <h3 className='garage-name'>{gr.name}</h3>
                            <p className='garage-owner'><strong>Owner:</strong> {gr.owner}</p>
                            <p className='garage-status'><strong>Status:</strong> {gr.avaliability_status ? 'Open' : 'Closed'}</p>
                            <p className='garage-hours'><strong>OpeningHours:</strong> {gr.openingHours}</p>
                            <p className='garage-phone'><strong>Contact:</strong> {gr.phoneno}</p>
                            <Link to={`/garageowner/updategarage/${gr._id}`} className='update-btn' style={{ backgroundColor: "#121310" }}>Update</Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}
