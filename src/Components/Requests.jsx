import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestsSlice'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
    const dispatch = useDispatch()

    const requests = useSelector((store) => store.requests)


    const getRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/request`, { withCredentials: true });
            console.log("Requests:", res.data.connectionsRequests);
            dispatch(addRequests(res.data.connectionsRequests)); // backend sends { message, data }
        } catch (error) {
            console.error("Error fetching requests:", error.response?.data || error.message);
        }
    };
    useEffect(() => {
        getRequests();
    }, [])

    // const handleAccept = async ()=>{

    //     const
    // }

    return (
        <ul className="list bg-base-300 rounded-box shadow-md">

            <h1 className='text-center font-bold text-white text-3xl mt-10'> My Connections</h1>

            {requests.map((request) => {

                const { _id, firstName, lastName, age, gender, about, skills, photourl } = request.fromUserId;


                return (< li className="list-row mt-4 flex " key={_id} >
                    <div><img className="size-10 rounded-box" src={photourl} /></div>
                    <div>
                        <div className='text-[16px]'>{firstName}{" "} {lastName}</div>
                        {age && gender && <div className="text-xs uppercase font-semibold opacity-60"> {age} , {gender}</div>}
                    </div>
                    {about && <p className="list-col-wrap text-xs">
                        {about}
                    </p>}
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <div key={index} className="badge badge-lg badge-outline badge-secondary">
                                {skill}
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-primary">Accept</button>
                    <button className="btn btn-error">Reject</button>
                </li>)
            })}

        </ul >
    )
}

export default Requests
