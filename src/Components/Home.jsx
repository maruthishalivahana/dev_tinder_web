import React from 'react'
import Navbar from './Navbar'

import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import api from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import { store } from '../utils/appStore'
import axios from 'axios'



function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const fetchUser = async () => {
        // if user already exists in Redux store, skip the API call
        if (user && user._id) return

        try {
            const res = await api.get('/profile')
            dispatch(addUser(res.data.user))
        } catch (error) {
            if (error?.response?.status === 401) {
                navigate("/login")
            }


        }

    }

    useEffect(() => {
        fetchUser();

    }, [])
    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />


            <main className="flex-1 pt-16">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Home
