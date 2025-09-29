import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'feed',
    initialState: {
        feed: null,
    },
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state) => {
            return null
        },
    },
})

export const { addFeed, removeFeed } = userSlice.actions
export default userSlice.reducer