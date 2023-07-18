import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductDetailState {
    loading: boolean;
    error: null | string;
    product: any,
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    product: null,
}

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.product = action.payload;
        },
        fetchFail: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})