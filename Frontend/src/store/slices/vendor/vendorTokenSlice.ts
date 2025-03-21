import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
    token: string | null;
}

const initialState: TokenState = {
    token: null
}

export const vendorTokenSlice = createSlice({
    name: 'vendorToken',
    initialState,
    reducers: {
        addVendorToken: (state, action) => {
            state.token = action.payload
        },
        removeVendorToken: (state, action) => {
            state.token = null
        }
    }
})

export const { addVendorToken, removeVendorToken } = vendorTokenSlice.actions
export default vendorTokenSlice.reducer