import React, { useEffect } from 'react'
import api from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            const res = await api.get('/user/feed')
            dispatch(addFeed(res.data.feed))
        } catch (error) {
            console.error(error.message)
        }

    }
    useEffect(() => {
        getFeed();
    }, [])

    if (!feed || feed.length === 0) {
        return (
            <div className="text-center text-white text-2xl mt-10">
                No new feeds available
            </div>
        )
    }
    return (
        <UserCard user={feed[0]} />

    )
}

export default Feed
