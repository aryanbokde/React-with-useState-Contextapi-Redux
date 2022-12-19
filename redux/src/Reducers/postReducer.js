import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetch1, fetch2}  from '../Helpers/helper';
import {toast} from 'react-toastify';

const initialState = {
    loading:false,
    data: [],
    success: "",
    error: ""
}

export const fetchPostByUser = createAsyncThunk(
    'fetchpostbyuser',
    async()=> {
        const result = await fetch2("http://localhost:5000/api/posts/getpostsbyuser", "get");
        return result
    }
);

export const fetchPostById = createAsyncThunk(
    'fetchpostbyid',
    async(path)=> {
        const result = await fetch2(`http://localhost:5000/api/posts/${path}`, "get");
        return result
    }    
);

export const createPost = createAsyncThunk(
    'createpost',
    async(body)=> {
        const result = await fetch1("http://localhost:5000/api/posts/", "post", body);
        return result
    }    
);  

export const updatePostById = createAsyncThunk(
    'updatepostbyid',
    async(body)=> {        
        let postId = body.paramId;
        if (delete(body.paramId)) {
            const result = await fetch1(`http://localhost:5000/api/posts/${postId}`, "put", body);
            return result
        }
    }    
);

export const postDeleteById = createAsyncThunk(
    'postdeletebyid',
    async(postId)=> {        
        const result = await fetch2(`http://localhost:5000/api/posts/${postId}`, "delete");
        return result
    }    
);

export const getAllPosts = createAsyncThunk(
    'getallposts',
    async(query='')=> {
        const result = await fetch2(`http://localhost:5000/api/posts/${query}`, "get");
        return result
    }
);


const postReducer = createSlice({
    name:"post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ========== Create New Post ============= //
        builder.addCase(createPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createPost.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.success = message
                toast.success(message);
            }else{
                state.error = message
                toast.error(message);
            }
        })

        // ========== Fetch post By User ============= //
        builder.addCase(fetchPostByUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPostByUser.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.data = message                
            }else{
                state.error = message
                toast.error(message);
            }
        })

        // ========== Fetch post By Id ============= //
        builder.addCase(fetchPostById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPostById.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.data = message
            }else{
                state.error = message
                toast.error(message);
            }
        })

        // ========== Update post By Id ============= //
        builder.addCase(updatePostById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePostById.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.success = message
                toast.success(message);
            }else{
                state.error = message
                toast.error(message);
            }
        })
        // ========== Delete post By Id ============= //
        builder.addCase(postDeleteById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(postDeleteById.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.success = message
                toast.success(message);
            }else{
                state.error = message
                toast.error(message);
            }
        })

        // ========== Get all posts for front end user ============= //
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllPosts.fulfilled, (state, {payload:{status, message}}) => {
            state.loading = false
            if (status) {
                state.data = message
                
            }else{
                state.error = message
                toast.error(message);
            }
        })
    }
});

export default postReducer.reducer;