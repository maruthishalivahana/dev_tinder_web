import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestsSlice';
import { BASE_URL } from '../utils/constants';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    // Fetch all requests
    const getRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/request`, { withCredentials: true });

            dispatch(addRequests(res.data.connectionsRequests));
        } catch (error) {
            console.error("Error fetching requests:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);


    const handleReview = async (status, id) => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {}, { withCredentials: true });
            dispatch(removeRequests(id));
        } catch (error) {
            console.error("Error reviewing request:", error.response?.data || error.message);
        }
    };

    if (!requests || requests.length === 0) {
        return (
            <div className="text-center text-2xl text-white mt-10">
                No Requests Found
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-center font-bold text-white text-3xl mb-6">My Connection Requests</h1>
            <ul className="space-y-4">
                {requests.map((request) => {
                    const { _id, firstName, lastName, age, gender, about, skills, photourl } = request.fromUserId;

                    return (
                        <li key={_id} className="flex flex-col md:flex-row items-start md:items-center bg-base-300 p-4 rounded-lg shadow-md gap-4">
                            <img
                                src={photourl || 'https://img.daisyui.com/images/profile/demo/1@94.webp'}
                                alt={`${firstName} ${lastName}`}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="text-lg font-semibold text-white">{firstName} {lastName}</div>
                                {age && gender && (
                                    <div className="text-xs uppercase font-semibold text-gray-400">{age} , {gender}</div>
                                )}
                                {about && <p className="text-sm text-gray-200 mt-1">{about}</p>}
                                {skills && skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {skills.map((skill, index) => (
                                            <span key={index} className="badge badge-outline badge-secondary">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleReview("accepted", request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-error"
                                    onClick={() => handleReview("reject", request._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Requests;
