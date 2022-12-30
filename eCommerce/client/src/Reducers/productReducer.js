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

//Fetch All Products 
export const fetchAllProduct = createAsyncThunk(
    'fetchallproduct',
    async()=> {       
        const result = await fetch2("/products", "get");
        return result
    }
);




//Fetch Product Detail
export const productDetail = createAsyncThunk(
    'productdetail',
    async(productId)=> {       
        const result = await fetch2(`/product/${productId}`, "get");
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
            }else{
                toast.error(message);
            }
        })    
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
            console.log(action.error.message);
        })    
        // ========== Get Product detail ============= //
        builder.addCase(productDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(productDetail.fulfilled, (state, {payload:{success, product, message }}) => {
            state.loading = false
            if (success) {
                state.products = product
            }else{
                toast.error(message);
            }
        })    
        builder.addCase(productDetail.rejected, (state, action) => {
            console.log(action.error.message);
        })    
           
    }
});

export default productReducer.reducer;