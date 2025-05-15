import { createSlice } from "@reduxjs/toolkit";

interface adminToken{
    adminToken:string | null
}

const initialState:adminToken={
    adminToken:null
}

export const adminTokenSlice=createSlice({
    name:'adminToken',
    initialState,
    reducers:{
        addAdminToken:(state,action)=>{
            state.adminToken=action.payload
        },
        removeAdminToken:(state,_action)=>{
            state.adminToken=null
        }
    }
})

export const {addAdminToken,removeAdminToken}=adminTokenSlice.actions
export default adminTokenSlice.reducer