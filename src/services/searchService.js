import axios from "axios";
import serverUrl from "../config/serverUrl.js";


const API_URL = serverUrl;

/**
 * Fetch products based on search query
 * @param {string} query - The search query string
 * @returns {Promise<Object>} - The response from the API
 */
export const fetchProductsByQuery = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/products/search`, {
            params: {
                query,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};