import React from 'react'
import { useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate()
    return (
        <>
            <div className="navbar bg-base-200 shadow-sm fixed">
                <div className="flex-1">
                    <span className="text-xl font-bold text-purple-500"></span>
                    <a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>{'</>'} DevSwipe</a>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-neutral bg-base-300" onClick={() => navigate('/login')}>Login</button>
                    <div className="dropdown dropdown-end mx-8">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
