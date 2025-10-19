import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initialize state with existing user data
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [photourl, setPhotourl] = useState(user?.photourl || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [skills, setSkills] = useState(user?.skills || '');
    const [about, setAbout] = useState(user?.about || '');
    const [loading, setLoading] = useState(false);

    const handleEditProfile = async () => {
        // Basic validation
        if (!firstName || !lastName) {
            toast.error('First Name and Last Name are required');
            return;
        }

        setLoading(true);

        try {
            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    age: Number(age) || undefined,
                    skills,
                    about,
                    gender,
                    photourl,
                },
                { withCredentials: true } // send cookies with request
            );

            dispatch(addUser(res.data.user));
            toast.success('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 bg-base-100 p-8 rounded-2xl shadow-lg overflow-y-auto max-h-[80vh]">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Edit Profile</h2>

            {user && (
                <form
                    className="space-y-6"
                    onSubmit={e => {
                        e.preventDefault();
                        handleEditProfile();
                    }}
                >
                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">First Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                className="input input-bordered w-full"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Last Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                className="input input-bordered w-full"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Gender + Age */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Gender</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                            >
                                <option disabled value="">
                                    Select gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Age</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter age"
                                className="input input-bordered w-full"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Paste image URL"
                            className="input input-bordered w-full"
                            value={photourl}
                            onChange={e => setPhotourl(e.target.value)}
                        />
                        {photourl && (
                            <div className="mt-3">
                                <img
                                    src={photourl}
                                    alt="Preview"
                                    className="w-28 h-28 object-cover rounded-xl border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Skills</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter skills (comma separated)"
                            className="input input-bordered w-full"
                            value={skills}
                            onChange={e => setSkills(e.target.value)}
                        />
                    </div>

                    {/* About */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">About</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full h-28"
                            placeholder="Write something about yourself"
                            value={about}
                            onChange={e => setAbout(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Save Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`btn btn-primary px-10 ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditProfile;
