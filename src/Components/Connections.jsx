import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addConnections } from '../utils/connections'
import { useSelector } from 'react-redux'

const Connections = () => {
    const dispatch = useDispatch();
    const getConncetions = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/conncetions`,

                { withCredentials: true })



            const connections = Array.isArray(res.data.data) ? res.data.data : [];
            dispatch(addConnections(connections))
        } catch (error) {
            console.error(error.message)
        }

    }
    useEffect(() => {
        getConncetions();

    }, [])


    const users = useSelector((store) => store.connections)


    return (
        <ul className="list bg-base-300 rounded-box shadow-md">

            <h1 className='text-center font-bold text-white text-3xl mt-10'> My Connections</h1>

            {users.map((user) => {

                const { firstName, lastName, age, gender, about, skills, photourl } = user


                return (< li className="list-row mt-4 flex " key={user._id} >
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


                </li>)
            })}

        </ul >
    )
}

export default Connections
