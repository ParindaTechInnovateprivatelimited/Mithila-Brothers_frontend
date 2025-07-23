import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';
import { getOffer } from '../../services/adminProducts';

const initialState = {
    offer:[],
    categories: [],
    subcategories: [],
    category: null,
    subcategory: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

export const getCategories = createAsyncThunk(
    'categories/getAll',
    async (_, thunkAPI) => {
        try {
            return await categoryService.getCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCategoryById = createAsyncThunk(
    'categories/getById',
    async (id, thunkAPI) => {
        try {
            return await categoryService.getCategoryById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSubCategories = createAsyncThunk(
    'categories/getSubCategories',
    async (thunkAPI) => {
        try {
            return await categoryService.getSubCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSubCategoryById = createAsyncThunk(
    'categories/getSubCategoryById',
    async (subCategoryId, thunkAPI) => {
        try {
            return await categoryService.getSubCategoryById(subCategoryId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getOffers = createAsyncThunk(
    'categories/offer',
    async (thunkAPI) =>{
        try {
            return await getOffer();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload.categories;
            })
            .addCase(getCategories.rejected, (state, action) => {

                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            .addCase(getSubCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.subcategories = action.payload.subcategories;
            })
            .addCase(getSubCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            .addCase(getCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category = action.payload.category;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })

            .addCase(getSubCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.subcategory = action.payload.category;
            })
            .addCase(getSubCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(getOffers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOffers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.offer = action.payload.offer;
            })
            .addCase(getOffers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action?.payload?.message;
            });
    }
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
