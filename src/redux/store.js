import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import wishListReducer from './slices/wishListSlice'
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice'
import adminAuthReducer from './slices/adminAuthSlice'
import categoryReducer from './slices/categorySlice'
import reviewReducer from './slices/reviewSlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishListReducer,
    addresses: addressReducer,
    orders: orderReducer,
    adminAuth: adminAuthReducer,
    category: categoryReducer,
    productReviews: reviewReducer,
    adminData: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
