import { createSlice } from '@reduxjs/toolkit'

const feedSlice = createSlice({
    name: 'feed',
    initialState: [], // just an array for simplicity
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state, action) => {
            return state.filter((user) => user._id !== action.payload)
        },
    },
})

export const { addFeed, removeFeed } = feedSlice.actions
export default feedSlice.reducer
