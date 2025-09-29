import { createSlice } from '@reduxjs/toolkit'

const conncetionSlice = createSlice({
    name: 'connection',
    initialState: [],
    reducers: {
        addConnections: (state, action) => {
            return action.payload
        },
        removeConncetions: (state) => {
            return [];
        },
    },
})

export const { addConnections, removeConncetions } = conncetionSlice.actions
export default conncetionSlice.reducer