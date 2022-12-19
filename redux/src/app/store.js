import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authReducer';
import postReducer from '../Reducers/postReducer';
import userReducer from '../Reducers/userReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer
  },
});
