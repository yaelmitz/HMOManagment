import {createSlice} from "@reduxjs/toolkit"
//import { configureStore } from "@reduxjs/toolkit";

const initialState={
    listMembers:[]
}

export const memberSlice=createSlice({
 name:"member",
 initialState,
 reducers:{
    getMembers:(state,action)=>{
        state.listMembers=(action.payload);
    },
    addMember:(state,action)=>{
        state.listMembers.push(action.payload);
    },
 },
})
export const{getMembers,addMember}=memberSlice.actions
export default memberSlice.reducer