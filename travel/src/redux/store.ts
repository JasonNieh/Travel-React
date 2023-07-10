import { combineReducers, createStore } from "redux";
import { LanguageReducer } from "./language/languageReducer";
import { RecommendProductReducer } from "./recommendProducts/RecommendProductReducer";

const RootReducer = combineReducers({
    language: LanguageReducer,
    recommendProducts: RecommendProductReducer,
})
const store = createStore(RootReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;