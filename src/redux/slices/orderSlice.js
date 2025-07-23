import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getOrder, getOrderById } from '../../services/orderService';
import { getCartItems } from '../../services/cartService';


export const fetchCartForOrder = createAsyncThunk('order/fetchCart', async () => {
    const response = await getCartItems();
    return response.data;
});


export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData) => {
    const response = await createOrder(orderData);
    return response;
});

export const getOrders = createAsyncThunk('order/getOrders', async () => {
    const response = await getOrder();
    return response;
})

export const getOrdersById = createAsyncThunk('order/getOrdersById', async (id) => {
    const response = await getOrderById(id);
    return response;
})
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        items: [],
        subtotalAmount: 0,
        totalAmount: 0,
        shippingCharge: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartForOrder.pending, (state) => {
                return state
            })
            .addCase(fetchCartForOrder.fulfilled, (state, action) => {
                const { items, total, subtotal, shippingCharges } = action.payload;

                const formattedItems = items.map(item => {
                    const product = item.product;
                    const offer = item?.offerId;

                    return {
                        productId: product.id,
                        originalPrice: product.price,
                        finalPrice: item.discountPrice,
                        quantity: item.quantity,
                        offerId: offer,
                        size: item.size
                    };
                });

                state.items = formattedItems;
                state.subtotalAmount = subtotal;
                state.totalAmount = total;
                state.shippingCharge = shippingCharges;
            })
            .addCase(fetchCartForOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(placeOrder.pending, (state) => {
                state.orderStatus = 'loading';
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.orderStatus = 'succeeded';
                state.orderResponse = action.payload;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.orderStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getOrders.pending, (state) => {
                state.getOrderStatus = 'loading';
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.getOrderStatus = 'succeeded';
                state.getOrders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.getOrderStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getOrdersById.pending, (state) => {
                state.getOrdersByIdStatus = 'loading';
            })
            .addCase(getOrdersById.fulfilled, (state, action) => {
                state.getOrdersByIdStatus = 'succeeded';
                state.getOrdersById = action.payload;
            })
            .addCase(getOrdersById.rejected, (state, action) => {
                state.getOrdersByIdStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export default orderSlice.reducer;
