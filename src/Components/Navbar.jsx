import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { store } from '../utils/appStore'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { toast, ToastContainer } from 'react-toastify'

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/logout`, {},
                { withCredentials: true })

            if (res.data?.message) {
                toast.success(res.data.message);
            }
            dispatch(removeUser())


            return navigate("/login")

        } catch (error) {
            console.error(error.message)
        }

    }
    return (
        <>
            <div className="navbar bg-base-200 shadow-sm fixed mb-40">
                <div className="flex-1">
                    <span className="text-xl font-bold text-purple-500"></span>
                    <Link to="/" className="btn btn-ghost text-xl">{'</>'} DevSwipe</Link>
                </div>
                <div className="flex gap-2">
                    {/* <button className="btn btn-neutral bg-base-300" onClick={() => navigate('/login')}>Login</button> */}
                    {user?._id && < div className="dropdown dropdown-end mx-8">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photourl} />
                            </div>
                        </div>
                        <ul

                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box  relative  mt-3 w-52 p-2 shadow z-50 ">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to='/connections'>Conncetions</Link></li>
                            <li><Link to='/requests'>Requests</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>}
                </div>
            </div >
        </>
    )
}

export default Navbar
