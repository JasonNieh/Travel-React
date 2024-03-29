import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: null | string;
    items: any[],
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: [],
}

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            });
        return data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,

                },
            });
        return data.shoppingCartItems;
    }
);
export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,

                },
            });
        return data;
    }
);
export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwt: string; itemId: number[] }, thunkAPI) => {
        return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemId.join(",")})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
    }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
            state.items = [];
        },
        [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = [];
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
}
);