import { createSlice } from "@reduxjs/toolkit";

interface vendor {
    _id: string
    email: string,
    name: string,
    phone:number,
    role: 'vendor',
    status: 'active' | 'block',
    vendorId: string,
    vendorStatus: 'pending' | 'approved' | 'rejected',
    rejectReason?: string,
    image?: string,
    profileImage:string
}

const initialState:{vendor:vendor | null} = {
    vendor:null
}

export const vendorSlice=createSlice({
    name:'vendorSlice',
    initialState,
    reducers:{
        addVendor:(state,action)=>{
            state.vendor=action.payload
        },
        removeVendor:(state,action)=>{
            state.vendor=null
        }
    }
})

export const {addVendor,removeVendor}=vendorSlice.actions
export default vendorSlice.reducer