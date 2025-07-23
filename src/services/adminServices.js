import axios from 'axios';
import serverUrl from '../config/serverUrl';


const API_URL = `${serverUrl}/admin`;

export const getStats = async() =>{
    try {
        const response = await axios.get(`${API_URL}/stats`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export const getOrders = async() =>{
    try {
        const response = await axios.get(`${API_URL}/orders`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export const getProducts = async() =>{
    try {
        const response = await axios.get(`${API_URL}/products`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export const getProductById = async(id) =>{
    try {
        const response = await axios.get(`${API_URL}/products/${id}`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}


export const getUsers = async() =>{
    try {
        const response = await axios.get(`${API_URL}/users`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}