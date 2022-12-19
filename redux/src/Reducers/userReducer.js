import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetch1, fetch2 } from '../Helpers/helper';
import {toast} from 'react-toastify';

const initialState = {
    loading:false,
    success: "",
    error: "",
    data:[]
}

export const userByid = createAsyncThunk(
    'userbyid',
    async(userId)=> {           
        const result = await fetch2(`http://localhost:5000/api/users/${userId}`, "get");
        return result
    }
);

export const updateUserById = createAsyncThunk(
    'updateUserByid',
    async(body)=> {        
        let UserId = body.UserId;
        if (delete(body.UserId)) {
            const result = await fetch1(`http://localhost:5000/api/users/${UserId}`, "put", body);
            return result
        }
    }
);

const userReducer = createSlice({
    name:"user",
    initialState,
    reducers: {},
    extraReducers:(builder) => {

        // ========== Get Current user data ============= //
        builder.addCase(userByid.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userByid.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.data = message
            }else{
                state.error = message
                toast.error(message);
            }
        })
        // ========== Update User by Id ============= //
        builder.addCase(updateUserById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUserById.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.success = message
                toast.success(message);
            }else{
                state.error = message
                toast.error(message);
            }
        })
        
    }
});

export default userReducer.reducer;