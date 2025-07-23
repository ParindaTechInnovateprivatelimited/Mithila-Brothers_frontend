import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getOrders, getProductById, getProducts, getStats, getUsers } from '../../services/adminServices';

const API_BASE_URL = 'https://your-api-url.com/admin';

export const fetchAdminStats = createAsyncThunk('admin/fetchStats', async (_, { rejectWithValue }) => {
    try {
        const response = await getStats();
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await getUsers();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async Thunk for fetching user details
export const fetchUserDetails = createAsyncThunk('admin/fetchUserDetails', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchProducts = createAsyncThunk('admin/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await getProducts();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchProductDetails = createAsyncThunk('admin/fetchProductDetails', async (id, { rejectWithValue }) => {
    try {
        const response = await getProductById(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchOrders = createAsyncThunk('admin/fetchOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await getOrders();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: {
            loading: false,
            data: null,
            error: null
        },
        users: {
            data: [],
            loading: false,
            error: null
        },
        userDetails: {
            data: null,
            error: null,
            loading: false
        },
        products: {
            data: [],
            loading: false,
            error: null
        },
        productDetails: {
            data: null,
            error: null,
            loading: false
        },
        orders: {
            data: [],
            loading: false,
            error: null
        }
    },
    reducers: {
        resetUserDetails: (state) => {
            state.userDetails = null;
        },
        resetProductDetails: (state) => {
            state.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Stats
        builder
            .addCase(fetchAdminStats.pending, (state) => {
                state.stats.loading = true;
                state.stats.error = null;
            })
            .addCase(fetchAdminStats.fulfilled, (state, action) => {
                state.stats.loading = false;
                state.stats.data = action.payload;
            })
            .addCase(fetchAdminStats.rejected, (state, action) => {
                state.stats.loading = false;
                state.stats.error = action.payload;
            });

        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.users.loading = true;
                state.users.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users.loading = false;
                state.users.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.users.loading = false;
                state.users.error = action.payload;
            });

        // Fetch User Details
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.userDetails.loading = true;
                state.userDetails.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.userDetails.loading = false;
                state.userDetails.data = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.userDetails.loading = false;
                state.userDetails.error = action.payload;
            });

        // Fetch Products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products.loading = true;
                state.products.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.loading = false;
                state.products.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products.loading = false;
                state.products.error = action.payload;
            });

        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.productDetails.loading = true;
                state.productDetails.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.productDetails.loading = false;
                state.productDetails.data = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.productDetails.loading = false;
                state.productDetails.error = action.payload;
            });

        // Fetch Orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.orders.loading = true;
                state.orders.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders.loading = false;
                state.orders.data = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.orders.loading = false;
                state.orders.error = action.payload;
            });
    },
});

export const { resetUserDetails, resetProductDetails } = adminSlice.actions;

export default adminSlice.reducer;
