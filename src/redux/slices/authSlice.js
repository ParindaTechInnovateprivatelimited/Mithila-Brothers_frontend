import { createSlice } from '@reduxjs/toolkit';
import {
    fetchUserData,
    loginUser,
    registerUser,
    googleLogin,
    logoutUser,
    updateUserData
} from '../actions/authThunk';

import * as reducers from '../reducers/authReducer';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, reducers.fetchUserPending)
            .addCase(fetchUserData.fulfilled, reducers.fetchUserFulfilled)
            .addCase(fetchUserData.rejected, reducers.fetchUserRejected)
            .addCase(loginUser.pending, reducers.loginUserPending)
            .addCase(loginUser.fulfilled, reducers.loginUserFulfilled)
            .addCase(loginUser.rejected, reducers.loginUserRejected)
            .addCase(registerUser.pending, reducers.registerUserPending)
            .addCase(registerUser.fulfilled, reducers.registerUserFulfilled)
            .addCase(registerUser.rejected, reducers.registerUserRejected)
            .addCase(googleLogin.pending, reducers.googleLoginPending)
            .addCase(googleLogin.fulfilled, reducers.googleLoginFulfilled)
            .addCase(googleLogin.rejected, reducers.googleLoginRejected)
            .addCase(logoutUser.pending, reducers.logoutUserPending)
            .addCase(logoutUser.fulfilled, reducers.logoutUserFulfilled)
            .addCase(logoutUser.rejected, reducers.logoutUserRejected)
            .addCase(updateUserData.pending, reducers.updateUserPending)
            .addCase(updateUserData.fulfilled, reducers.updateUserFulfilled)
            .addCase(updateUserData.rejected, reducers.updateUserRejected);
    },
});

export const { setUser } = authSlice.actions;

export {
    fetchUserData,
    loginUser,
    registerUser,
    googleLogin,
    logoutUser,
    updateUserData,
};

export default authSlice.reducer;
