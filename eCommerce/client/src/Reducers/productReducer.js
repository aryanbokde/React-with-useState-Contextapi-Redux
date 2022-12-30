import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
    loading:false,
    products: [],
    success: "",
    error: "",
    productCount:null,
}

const fetch2 = async(url, type) => {   //1
    const res = await fetch(url, {
        method:type,
        headers:{
            "Content-Type" : "application/json"
        },       
    })
    return await res.json();
};

export const fetchAllProduct = createAsyncThunk(
    'fetchallproduct',
    async()=> {       
        const result = await fetch2("/products", "get");
        return result
    }
);



const productReducer = createSlice({
    name:"product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ========== Get All Products ============= //
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAllProduct.fulfilled, (state, {payload:{success, products, productCount, message}}) => {
            state.loading = false
            if (success) {
                state.products = products
                state.productCount = productCount
            }
        })    
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
            console.log(action.error.message);
            toast.error(action.error.message);
        })    
           
    }
});

export default productReducer.reducer;