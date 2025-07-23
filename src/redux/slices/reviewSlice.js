import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductReview } from '../../services/productReview';

const initialState = {
    reviewsAndRatings: [],
    loading: false,
    error: null,
};

export const fetchReview = createAsyncThunk(
    'ratings/fetchReview',
    async (id) => {
        const response = await fetchProductReview(id) ;
        return response.reviews;
    }
);


const reviewSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.reviewsAndRatings = action.payload;
                state.loading = false;
            })
            .addCase(fetchReview.rejected, (state, action) => {
                console.error('Failed to fetch rating:', action.error.message);
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default reviewSlice.reducer;
