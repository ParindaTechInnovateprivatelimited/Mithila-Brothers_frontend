import axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, signInWithPopup, googleProvider, auth, signOut } from './firebase-config';
import serverUrl from "../config/serverUrl.js";

const API_URL = serverUrl;


export const testUserLogin = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/admin/auth/test`, { email }, { withCredentials: true });
        const jwtToken = response.data.data.token
        if (jwtToken) {
            localStorage.setItem('adminToken', jwtToken);
        }
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/user`, {
            withCredentials: true
        });
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
};

export const registerWithEmailAndPassword = async (formData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        const fbToken = user.accessToken;
        // localStorage.setItem('fftoken', fbToken);
        try {
            const response = await axios.post(`${API_URL}/admin/auth`, { 'fbToken': fbToken }, { withCredentials: true });
            const token = response.data.data.token;
            const updatedUser = await axios.patch(`${API_URL}/admin/user`, {
                'firstName': formData.firstName,
                'lastName': formData.lastName,
                'pincode': formData.pincode,
                'address': formData.address,
                'phone': formData.phone
            }, {
                withCredentials: true
            })
            if (token) {
                localStorage.setItem('adminToken', token);
            }
            return updatedUser.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            throw error;
        }
    } catch (error) {
        console.error('Registration error:', error.message);
        throw error;
    }
};

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        try {
            const response = await axios.post(`${API_URL}/admin/auth`, { 'fbToken': token }, { withCredentials: true });
            // console.log(response)
            const jwtToken = response.data.data.token
            if (jwtToken) {
                localStorage.setItem('adminToken', jwtToken);
                localStorage.setItem('adminFbToken', token);
            }
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            throw error.response.data;
        }
    } catch (error) {
        console.error('Sign in error:', error.message);
        throw error;
    }
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const fbtoken = await user.getIdToken();
        // localStorage.setItem('tokenssss', fbtoken);
        try {
            const response = await axios.post(`${API_URL}/admin/auth`, { 'fbToken': fbtoken }, { withCredentials: true });
            const jwtToken = response.data.data.token
            if (jwtToken) {
                localStorage.setItem('adminToken', jwtToken);
            }
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            throw error;
        }
    } catch (error) {
        console.error('Google sign in error:', error.message);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error.message);
        throw error;
    }
};
