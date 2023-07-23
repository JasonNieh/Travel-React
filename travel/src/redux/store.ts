import { createStore, applyMiddleware } from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { LanguageReducer } from "./language/languageReducer";
import { RecommendProductReducer } from "./recommendProducts/RecommendProductReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { UserSlice } from "./user/slice";

const rootReducer = combineReducers({
    language: LanguageReducer,
    recommendProducts: RecommendProductReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: UserSlice.reducer,
})

// const store = createStore(RootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;