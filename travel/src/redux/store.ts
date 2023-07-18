import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import { LanguageReducer } from "./language/languageReducer";
import { RecommendProductReducer } from "./recommendProducts/RecommendProductReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";

const RootReducer = combineReducers({
    language: LanguageReducer,
    recommendProducts: RecommendProductReducer,
    productDetail: productDetailSlice.reducer,
})
const store = createStore(RootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;