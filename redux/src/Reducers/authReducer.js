import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetch1, fetch2} from '../Helpers/helper';
import { toast } from 'react-toastify';
const initialState = {
    token:"",
    loading:false,
    success: "",
    data:[]
}

export const registerUser = createAsyncThunk(
    'registeruser',
    async(body)=> {
        const result = await fetch1("/auth/register", "post", body);
        return result
    }    
);  

export const loginUser = createAsyncThunk(
    'loginruser',
    async(body)=> {
        const result = await fetch1("/auth/login", "post", body);
        return result
    }    
);

export const getUserByAuthToken = createAsyncThunk(
    'getcurrentuser',
    async()=> {        
        const result = await fetch2(`/auth/getuser`, "post");
        return result
    }    
);


const authReducer = createSlice({
    name:"auth",
    initialState,
    reducers: {
        addToken:(state, action)=>{
            state.token = localStorage.getItem("token");
        }
    },
    extraReducers:(builder) => {

        // ========== Register New user ============= //
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {                
                state.success = message
                toast.success(message);
            }else{
                state.error = message
                toast.error(message);
               
            }
        })

        // ========== Login User ============= //
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, {payload:{status, message,token}}) => {
            state.loading = false
            if (status) {
                toast.success(message);
                state.success = message
                localStorage.setItem("token", token);
            }else{
                toast.error(message);
                // state.error = message
            }
        })

        // ========== Login User ============= //
        builder.addCase(getUserByAuthToken.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUserByAuthToken.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.data = message
                toast.success(message);
            }else{
                state.error = message
                toast.error(message);
            }
        })

    }
});

export const {addToken} = authReducer.actions;
export default authReducer.reducer;