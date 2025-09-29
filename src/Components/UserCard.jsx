import React from 'react'
import { User, Cake, MapPin, Sparkles } from 'lucide-react';
function UserCard({ user }) {
    console.log(user)
    const { firstName, lastName, about, age, gender, photourl, skills = [] } = user
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto my-10 overflow-hidden transform transition-transform duration-300 hover:scale-105">

            <figure className="relative h-60 w-full">
                <img
                    src={photourl}
                    alt={`${firstName} ${lastName}'s photo`}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                    <h2 className="text-3xl font-bold text-white">{firstName} {lastName}</h2>
                </div>
            </figure>

            <div className="card-body p-6">

                {(gender || age) && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        {gender && (
                            <span className="flex items-center gap-1">
                                <User size={16} className="text-primary" /> {gender}
                            </span>
                        )}
                        {age && (
                            <span className="flex items-center gap-1">
                                <Cake size={16} className="text-primary" /> {age} years
                            </span>
                        )}
                    </div>
                )}

                {/* About Section */}
                {about && (
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 text-primary">
                            <Sparkles size={18} /> About Me
                        </h3>
                        <p className="text-base-content text-sm leading-relaxed">{about}</p>
                    </div>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 text-primary">
                            <Sparkles size={18} /> Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="badge badge-lg badge-outline badge-secondary">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="card-actions justify-center gap-4 mt-4">
                    <button className="btn btn-primary flex-1">Connect</button>
                    <button className="btn btn-ghost flex-1">Ignore</button>
                </div>
            </div>
        </div>
    );

}

export default UserCard
