import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:null,
    err:false,
    loading:false
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading=true;
            state.err=false
        },
        SaveUser:(state,action)=>{
            state.user=action.payload
        },
        loginFailed:(state)=>{
            state.err=true
            state.loading=false
        },
        LogOut:()=>{
            return initialState
        }
    }
})
export const {loginStart,LogOut,SaveUser,loginFailed}=userSlice.actions
export default userSlice.reducer