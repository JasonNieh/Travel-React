import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

interface OrderState {
    loading: boolean;
    error: null | string;
    currentOrder: any,
}

const initialState: OrderState = {
    loading: true,
    error: null,
    currentOrder: null,
}

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (parameters: { jwt: string, orderId: string }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`
            , null, {
            headers: {
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: {
        [placeOrder.pending.type]: (state) => {
            state.loading = true;
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentOrder = action.payload;
            console.log("data:", state.currentOrder);
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentOrder = action.payload;
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})