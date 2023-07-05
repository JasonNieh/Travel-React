import { createStore } from "redux";
import { LanguageReducer } from "./language/languageReducer";

const store = createStore(LanguageReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;