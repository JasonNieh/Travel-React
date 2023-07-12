import { combineReducers, createStore, applyMiddleware } from "redux";
import { LanguageReducer } from "./language/languageReducer";
import { RecommendProductReducer } from "./recommendProducts/RecommendProductReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
const RootReducer = combineReducers({
    language: LanguageReducer,
    recommendProducts: RecommendProductReducer,
})
const store = createStore(RootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;