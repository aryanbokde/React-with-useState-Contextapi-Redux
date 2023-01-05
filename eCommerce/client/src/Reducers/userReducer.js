import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
    loading:false,
    user: [],
    success: "",
    error: "",
    token: "",
}


const fetch1 = async(link, type, body) => {    //2
    const res = await fetch(link, {
        method:type,
        headers:{
            "Content-Type" : "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body:JSON.stringify(body)
    })
    return await res.json();

};

//User Trying to Login Check user and login.
export const loginUser = createAsyncThunk(
    'loginUser',
    async(body)=> {
        let link = "/login";
        const result = await fetch1(link, "post", body);
        return result
    }
);


const userReducer = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        //User Trying to Login 
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        //User login
        builder.addCase(loginUser.fulfilled, (state, {payload:{success, user, token, message}}) => {
            state.loading = false
            if (success) {
                state.user = user
                state.token = token
                toast.success("You have successfullty LoggedIn.");
            }else{
                toast.error(message);
            }
        })
        //User login failed
        builder.addCase(loginUser.rejected, (state, action) => {
            toast.error(action.error.message);
        })
    }

});

export default userReducer.reducer;