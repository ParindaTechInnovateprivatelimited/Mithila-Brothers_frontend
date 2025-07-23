import { createSlice } from '@reduxjs/toolkit';
import {
    fetchAdminUserData,
    loginUser,
    registerUser,
    googleLogin,
    logoutUser,
    // updateUserData
} from '../actions/adminAuthThunk';

import * as reducers from '../reducers/adminAuthReducer';

const adminAuthSlice = createSlice({
    name: 'adminAuth',
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
            .addCase(fetchAdminUserData.pending, reducers.fetchUserPending)
            .addCase(fetchAdminUserData.fulfilled, reducers.fetchUserFulfilled)
            .addCase(fetchAdminUserData.rejected, reducers.fetchUserRejected)
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
            // .addCase(updateUserData.pending, reducers.updateUserPending)
            // .addCase(updateUserData.fulfilled, reducers.updateUserFulfilled)
            // .addCase(updateUserData.rejected, reducers.updateUserRejected);
    },
});

export const { setUser } = adminAuthSlice.actions;

export {
    fetchAdminUserData,
    loginUser,
    registerUser,
    googleLogin,
    logoutUser,
    // updateUserData,
};

export default adminAuthSlice.reducer;
