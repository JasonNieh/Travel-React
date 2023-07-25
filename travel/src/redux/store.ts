import { createStore, applyMiddleware } from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { LanguageReducer } from "./language/languageReducer";
import { RecommendProductReducer } from "./recommendProducts/RecommendProductReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { UserSlice } from "./user/slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"]
}

const rootReducer = combineReducers({
    language: LanguageReducer,
    recommendProducts: RecommendProductReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: UserSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(RootReducer, applyMiddleware(thunk, actionLog));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
    devTools: true,
})
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default { store, persistor };