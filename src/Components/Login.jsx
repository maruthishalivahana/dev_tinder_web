import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
function Login() {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {

        try {
            const res = await axios.post(`${BASE_URL}/login`, {
                email: emailId,
                password
            }, { withCredentials: true })
            toast.success(`welcome back!`)
            dispatch(addUser(res.data.user))
            navigate('/')
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-4">
                        Behind every great developer is a strong network. DevSwipe helps you discover, connect, and build with devs who share your passion for technology
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}

                            />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                pauseOnHover
                                draggable
                            />
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
