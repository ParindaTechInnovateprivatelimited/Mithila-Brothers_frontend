import axios from 'axios';
import serverUrl from "../config/serverUrl.js";

const API_URL = `${serverUrl}/user`;


export const getCartItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            withCredentials: true,
        });
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
};

export const updateCartQuantity = async (productId, quantity ) => {
    
    try {
        const response = await axios.patch(`${API_URL}/cart/${productId}`, { quantity },{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        throw error;
    }
};

export const removeCartItem = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/${productId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error removing cart item:", error);
        throw error;
    }
};

export const addItemToCart = async (productId, quantity, size) => {
    try {
        const response = await axios.post(`${API_URL}/cart`, { productId, quantity, size }, {
            withCredentials: true
        });
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
};