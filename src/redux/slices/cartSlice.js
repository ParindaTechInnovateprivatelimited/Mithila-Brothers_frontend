import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems } from '../../services/cartService';

const initialState = {
    items: [],
    coupons: [],
    itemCount: 0,
    subtotal: 0,
    shippingCharges: 0,
    total: 0,
    loading: false,
    error: null,
};

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCartItems();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateItemCount: (state, action) => {
            state.itemCount = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.itemCount = state.items.length;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.itemCount = state.items.length;
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                const { items = [], coupons = [], subtotal = 0, shippingCharges = 0, total = 0 } = action.payload || {};

                state.items = items;
                state.coupons = coupons;
                state.itemCount = items.length;
                state.subtotal = subtotal;
                state.shippingCharges = shippingCharges;
                state.total = total;
                state.loading = false;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cart items';
            });
    },
});

export const { updateItemCount, updateQuantity, removeItem, addItem } = cartSlice.actions;
export default cartSlice.reducer;
