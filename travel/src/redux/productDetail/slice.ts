import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductDetailState {
    loading: boolean;
    error: null | string;
    data: any,
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null,
}

export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
        return data;
    }
);

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})