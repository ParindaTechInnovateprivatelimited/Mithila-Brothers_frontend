import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addWishlistItem, deleteWishlistItem, fetchWishlists } from '../../services/userService';

export const getWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchWishlists()
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async (id, { rejectWithValue }) => {
        try {
            const response = await addWishlistItem(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (id, { rejectWithValue }) => {
        
        try {
            const response = await deleteWishlistItem(id)
            return response;
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlistItems: [],
        loading: false,
        error: null,
        successMessage: '',
    },
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems.push(action.payload);
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
