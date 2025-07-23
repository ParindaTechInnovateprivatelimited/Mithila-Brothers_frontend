import axios from "axios";
import serverUrl from "../config/serverUrl.js";


const API_URL = serverUrl;

// const token = localStorage.getItem('token');

export const fetchAddress = async () => {

    const response = await axios.get(`${API_URL}/order/address`, {
        withCredentials: true
    });
    return response.data;
};

export const addAddress = async (formData) => {
    
    try {
        const response = await axios.post(`${API_URL}/order/address`, formData,{
            withCredentials: true
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const removeAddress = async (id) => {
    
    try {
        const response = await axios.delete(`${API_URL}/order/address/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw(error.response.data)
    }
}

