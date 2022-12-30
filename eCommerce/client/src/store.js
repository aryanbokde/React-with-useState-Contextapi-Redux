import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './Reducers/productReducer';

export const store = configureStore({
    reducer: {
        product: ProductReducer
      },
  });