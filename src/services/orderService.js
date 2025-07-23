import axios from "axios";
import serverUrl from "../config/serverUrl.js";

const API_URL = serverUrl;

export const createOrder = async (orderData) => {

    const response = await axios.post(`${API_URL}/order`, orderData, {
        withCredentials: true
    });
    return response.data;
};


export const getOrder = async () => {

    const response = await axios.get(`${API_URL}/order`, {
        withCredentials: true
    });
    return response.data;
};


export const getOrderById = async (id) => {

    const response = await axios.get(`${API_URL}/order/${id}`, {
        withCredentials: true
    });
    return response.data.data;
};

export const initiatePayUPayment = async (order) => {
    try {
        const names = order.items.map((item) => item.productId.productName).join(', ')
        const response = await axios.post(
            `${API_URL}/payment`,
            {
                totalAmount: order.totalAmount,
                productInfo: names,
                userId: order.userId,
                orderId: order._id,
                address: order.shippingAddress
            },
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        console.error('Payment initiation failed:', error);
        throw error;
    }
};
