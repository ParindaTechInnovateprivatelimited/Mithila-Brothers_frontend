import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    registerWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    logout,
} from '../../services/adminAuthService';


import {
    fetchUser,
} from '../../services/adminAuthService';

export const fetchAdminUserData = createAsyncThunk('admin/auth/fetchUser', async () => {
    const user = await fetchUser();
    return user;
});

export const loginUser = createAsyncThunk(
    'admin/auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await signInWithEmailAndPassword(email, password);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const registerUser = createAsyncThunk(
    'admin/auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            await registerWithEmailAndPassword(formData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    'admin/auth/googleLogin',
    async (_, { rejectWithValue }) => {
        try {
            const res = await signInWithGoogle();
            return res.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'admin/auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await logout();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
