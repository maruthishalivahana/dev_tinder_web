import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Editprofile = () => {
    const user = useSelector(store => store.user)
    console.log(user)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age)
    const [photourl, setPhotourl] = useState(user.photourl)
    const [gender, setGender] = useState(user.gender)
    const [skills, setSkills] = useState(user.skills)
    const [about, setAbout] = useState(user.about)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleEditProfile = async () => {

        try {
            const res = await axios.patch(`${BASE_URL}/profile/edit`, {
                firstName,
                lastName,
                age,
                skills,
                about,
                gender,
                photourl


            }, { withCredentials: true })
            dispatch(addUser(res.data.user))
            navigate("/profile")
            toast.success("profile updated sucessfully !")
            console.log(res.data.user)
        } catch (error) {
            console.error(error.message)

        }

    }
    // useEffect(() => {
    //     handleEditProfile();

    // }, [])
    return (

        <div className="max-w-2xl mx-auto my-10 bg-base-100 p-8 rounded-2xl shadow-lg overflow-y-auto max-h-[80vh]">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Edit Profile</h2>

            {user && <form className="space-y-6">
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">First Name</span>
                        </label>
                        <input type="text" placeholder="Enter first name" className="input input-bordered w-full"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Last Name</span>
                        </label>
                        <input type="text" placeholder="Enter last name" className="input input-bordered w-full"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}

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
                            value={gender || ""}                 // controlled value from state
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option disabled value="">Select gender</option>  {/* placeholder */}
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>


                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Age</span>
                        </label>
                        <input type="number" placeholder="Enter age" className="input input-bordered w-full"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                        />
                    </div>
                </div>

                {/* Photo URL */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Photo URL</span>
                    </label>
                    <input type="text" placeholder="Paste image URL" className="input input-bordered w-full"
                        onChange={(e) => setPhotourl(e.target.value)}
                        value={photourl}

                    />
                    <div className="mt-3">
                        <img src={photourl} alt="Preview" className="w-28 h-28 object-cover rounded-xl border" />
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Skills</span>
                    </label>
                    <input type="text" placeholder="Enter skills (comma separated)" className="input input-bordered w-full"
                        onChange={(e) => setSkills(e.target.value)}
                        value={skills}
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                        <div className="badge badge-primary badge-outline">React</div>
                        <div className="badge badge-secondary badge-outline">Node.js</div>
                        <div className="badge badge-accent badge-outline">Tailwind</div>
                    </div>
                </div>

                {/* About */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">About</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full h-28" placeholder="Write something about yourself"
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                    ></textarea>
                </div>

                {/* Save Button */}
                <div className="text-center">
                    <button type="button" className="btn btn-primary px-10" onClick={handleEditProfile}>Save Changes</button>
                </div>
            </form>}
        </div>

    )
}

export default Editprofile
