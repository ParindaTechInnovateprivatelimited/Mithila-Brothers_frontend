import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    registerWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    logout,
    testUserLogin
} from '../../services/authService';
import {
    fetchUser,
    updateUser
} from '../../services/userService';

export const fetchUserData = createAsyncThunk('auth/fetchUser', async () => {
    const user = await fetchUser();
    return user;
});

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            if (email === 'sachinminde2002@gmail.com') {
                const testUserRes = await testUserLogin(email);
                return testUserRes.data;
            } else {
                const response = await signInWithEmailAndPassword(email, password);
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            await registerWithEmailAndPassword(formData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
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
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await logout();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserData = createAsyncThunk(
    'auth/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            const updatedUser = await updateUser(userData);
            return updatedUser;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);
