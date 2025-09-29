import { createSlice } from '@reduxjs/toolkit'

const conncetionSlice = createSlice({
    name: 'requests',
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequests: (state) => {
            return [];
        },
    },
})

export const { addRequests, removeRequests } = conncetionSlice.actions
export default conncetionSlice.reducer