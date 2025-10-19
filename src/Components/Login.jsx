import React from 'react'
import { useState } from 'react'
import api from '../utils/api'
import { toast, ToastContainer } from "react-toastify";
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
function Login() {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [isLogin, setLogin] = useState(true)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {

        try {
            const res = await api.post('/login', {
                email: emailId,
                password
            }, { withCredentials: true })

            navigate('/')
            dispatch(addUser(res.data.user))
            const firstName = res.data.user.firstName
            toast.success(`welcome back! ${firstName}`)
        } catch (error) {
            setError(error.response.data.message)
            toast.error(error)
        }
    }
    const handleSignUp = async () => {

        try {
            const res = await api.post('/register', {
                firstName,
                lastName,
                email: emailId,
                password
            })

            navigate('/editprofile')
            dispatch(addUser(res.data.user))
            // const firstName = res.data.user.firstName
            // toast.success(`welcome ! ${firstName}`)
        } catch (error) {
            setError(error.message)
            toast.error(error)
        }
    }


    const handleToggle = () => {
        if (!isLogin) {
            setLogin(true)
        } else {
            setLogin(false)
        }

    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{isLogin ? "login" : "signup"} now!</h1>
                    <p className="py-4">
                        Behind every great developer is a strong network. DevSwipe helps you discover, connect, and build with devs who share your passion for technology
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            {!isLogin && <label className="label">FirstName</label>}
                            {!isLogin && <input type="text" className="input" placeholder="FirstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}

                            />}
                            {!isLogin && <label className="label">LastName</label>}
                            {!isLogin && <input type="text" className="input" placeholder="LastName"
                                value={lastName}
                                onChange={(e) => setlastName(e.target.value)}

                            />}
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


                            <div className='flex justify-around '><a className="link link-hover " >Forgot password?</a>
                                <div>
                                    <p >{isLogin ? "if don't have account" : "if you have a account"} <span className='text-blue-400  hover:underline cursor-pointer' onClick={handleToggle}>{isLogin ? "signUp" : "Login"}</span> </p>
                                </div>
                            </div>
                            <p className='text-center text-red-400 text-[14px]'>{error}</p>
                            <button className="btn btn-neutral mt-4" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "Login" : "Signup"}</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
