import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addAddress, fetchAddress, removeAddress } from '../../services/addressService';


export const fetchAddresses = createAsyncThunk('addresses/fetchAddresses', async () => {
    const response = await fetchAddress();
    return response.data;
});

export const addAddresses = createAsyncThunk('addresses/addAddresses', async (addressData) => {
    const response = await addAddress(addressData);
    return response.data;
});


export const deleteAddress = createAsyncThunk('addresses/deleteAddress', async (id) => {
    const response = await removeAddress(id);
    return response;
});

const addressSlice = createSlice({
    name: 'addresses',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddresses.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.loading = false;
            })
            .addCase(addAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default addressSlice.reducer;
