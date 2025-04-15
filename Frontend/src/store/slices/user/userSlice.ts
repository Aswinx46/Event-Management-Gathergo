import { createSlice } from "@reduxjs/toolkit";

interface Client {
    clientId: string,
    email: string,
    name: string,
    phone: number,
    profileImage?: string,
    _id?: string
    role: 'client',
    status: 'active' | 'block'
    googleVerified: string
}

const initialState: { client: Client | null } = {
    client: null
}

export const clientSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {
        addClient: (state, action) => {
            state.client = action.payload
        },
        removeClient: (state, action) => {
            state.client = null
        }
    }
})

export const { addClient, removeClient } = clientSlice.actions
export default clientSlice.reducer