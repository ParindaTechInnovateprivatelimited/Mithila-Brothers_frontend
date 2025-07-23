import axios from 'axios';
import serverUrl from '../config/serverUrl';


const API_URL = `${serverUrl}/admin`;

export const addProduct = async(data) =>{

    try {
        const response = await axios.post(`${API_URL}/products`,data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export const deleteProduct = async(id) =>{
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export const createOffer = async(data) =>{
    try {
        const response = await axios.post(`${API_URL}/offer`,data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export const getOffer = async() =>{

    try {
        const response = await axios.get(`${API_URL}/offer`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}