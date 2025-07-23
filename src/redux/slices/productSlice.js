import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoryData, fetchProductById, fetchProducts, fetchProductsByColor } from '../../services/productService';

const initialState = {
  products: [],
  selectedProduct: {
    product: {},
    colors: [],
    images: [],
    isLoading: false,
    error: null,
  },
  trending: {
    data: [],
    isLoading: false,
    error: null,
  },
  newarrivals: {
    data: [],
    isLoading: false,
    error: null,
  },
  embroideredAbaya: {
    data: [],
    isLoading: false,
    error: null,
  },
  allProducts: {
    data: [],
    colors: [],
    pagination: {},
    isLoading: false,
    error: null,
  },
};

export const fetchCategory = createAsyncThunk(
  'products/fetchCategory',
  async (category) => {
    const response = await fetchCategoryData(category);
    return { category, data: response.data };
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    try {
      const [productResponse, ratingResponse] = await Promise.all([
        fetchProductById(id),
      ]);

      if (ratingResponse && ratingResponse.data && ratingResponse.data.length > 0) {
        const reviews = ratingResponse.data;
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

        return { ...productResponse, reviews, averageRating };
      } else {
        console.log('No ratings available.');
        return { ...productResponse, reviews: [], averageRating: 0 };
      }
    } catch (error) {
      console.error('Error fetching product or ratings:', error);
      throw error;
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async ({ categoryId, subCategoryId, color, page, sorting, priceRange }, { rejectWithValue, getState }) => {

    try {
      const response = await fetchProducts({ categoryId, subCategoryId, color, page, sorting, priceRange });

      const products = response.data.products || [];
      const newColors = response.data.colors || [];
      const pagination = response.data.pagination || {};

      const previousColors = getState().products.allProducts.colors || [];

      const colorsToStore = newColors.length > 0 ? newColors : previousColors;

      return {
        data: products,
        colors: colorsToStore,
        pagination: pagination
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchProductByColor = createAsyncThunk(
  'products/fetchProductByColor',
  async ({ color, productName }, { rejectWithValue }) => {
    try {

      const response = await fetchProductsByColor(color, productName);

      if (!response) {
        throw new Error('Product not found');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    selectProduct: (state, action) => {
      const productId = action.payload;
      let foundProduct = null;

      Object.keys(state).forEach(category => {
        if (state[category]?.data) {
          foundProduct = state[category].data.find(product => product.id === productId);
          if (foundProduct) {
            state.selectedProduct = {
              id: foundProduct.id,
              name: foundProduct.productName,
              rating: foundProduct.rating || 0,
              price: foundProduct.price,
              category: foundProduct.categoryId,
              images: [foundProduct.images],
              description: foundProduct.description,
              colors: [foundProduct.color],
              sizes: [],
              reviews: foundProduct.reviews || [],
              isLoading: false,
              error: null
            };
          }
        }
      });

      if (!foundProduct) {
        state.selectedProduct = {
          id: null,
          name: '',
          rating: 0,
          price: 0,
          category: '',
          images: [],
          description: '',
          colors: [],
          sizes: [],
          reviews: [],
          isLoading: false,
          error: null,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        const category = action.meta.arg;
        if (state[category]) {
          state[category].isLoading = true;
          state[category].error = null;
        }
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        const category = action.payload.category;
        if (state[category]) {
          state[category].isLoading = false;
          state[category].data = action.payload.data;
        }
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        const category = action.meta.arg;
        if (state[category]) {
          state[category].isLoading = false;
          state[category].error = action.error.message;
        }
      })
      .addCase(fetchProduct.pending, (state) => {
        state.selectedProduct.isLoading = true;
        state.selectedProduct.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { product, colors } = action.payload.data;
        state.selectedProduct = {
          product: product,
          images: product.images.length > 0 ? product.images : [],
          colors: colors.length > 0 ? colors : [],
          reviews: [],
          isLoading: false,
          error: null,
        };
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.selectedProduct.isLoading = false;
        state.selectedProduct.error = action.error.message;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.allProducts.isLoading = true;
        state.allProducts.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts.isLoading = false;
        state.allProducts.data = action.payload.data;
        state.allProducts.colors = action.payload.colors;
        state.allProducts.pagination = action.payload.pagination;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allProducts.isLoading = false;
        state.allProducts.error = action.payload;
      })
      .addCase(fetchProductByColor.pending, (state) => {
        state.colorProduct = {
          ...state.selectedProduct,
          isLoading: true,
          error: null,
        };
      })
      .addCase(fetchProductByColor.fulfilled, (state, action) => {
        const { product, colors } = action.payload;
        state.colorProduct = {
          product: product,
          images: product.images.length > 0 ? product.images : [],
          colors: colors.length > 0 ? colors : [],
          reviews: [],
        };
      })
      .addCase(fetchProductByColor.rejected, (state, action) => {
        state.colorProduct = {
          ...state.selectedProduct,
          isLoading: false,
          error: action.payload || 'Failed to fetch product by color',
        };
      });
  },
});

export const { setProducts, selectProduct } = productSlice.actions;
export default productSlice.reducer;
