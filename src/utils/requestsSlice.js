import { createSlice } from '@reduxjs/toolkit'

const conncetionSlice = createSlice({
    name: 'requests',
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequests: (state, action) => {
            const newarray = state.filter((req) => req._id !== action.payload);
            return newarray;
        }

    },
})

export const { addRequests, removeRequests } = conncetionSlice.actions
export default conncetionSlice.reducer