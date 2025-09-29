import React from 'react'
import { Mail, User, Cake, Users, Code, ArrowRight, Edit } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const user = useSelector(store => store.user)
    const navigate = useNavigate();

    if (!user) {
        return navigate("/login")
    }
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">

                {/* --- Avatar and Basic Info --- */}
                <div className="flex flex-col items-center p-8 border-b lg:border-r lg:border-b-0">
                    <div className="avatar mb-4">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photourl} alt={`${user.firstName} ${user.lastName}'s profile`} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center">{`${user.firstName} ${user.lastName}`}</h1>
                    <a href={`mailto:${user.email}`} className="text-sm text-gray-500 hover:text-primary mt-1">
                        {user.email}
                    </a>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Cake size={16} />
                            <span>{user.age} years</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{user.gender}</span>
                        </div>
                    </div>
                    <div className=' flex '>
                        <p>{user.about}</p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-soft">
                            <Edit size={18} />
                            Edit
                        </button>
                        <button className="btn btn-soft hover:btn-primary">
                            Connect
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* --- Details: Connections & Skills --- */}
                <div className="card-body">
                    {/* Connections Stat */}
                    <div className="stats shadow-md bg-primary text-primary-content mb-6">
                        <div className="stat">
                            <div className="stat-figure">
                                <Users />
                            </div>
                            <div className="stat-title text-primary-content">Connections</div>
                            <div className="stat-value">{user.connections}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Code size={20} />
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills && user.skills.map((skill, index) => (
                                <span key={index} className="badge badge-outline">{skill}</span>
                            ))}

                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Action Buttons */}

                </div>
            </div>
        </div>

    )
}

export default Profile
