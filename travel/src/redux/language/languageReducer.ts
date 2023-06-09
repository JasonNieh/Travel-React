import i18n from "i18next";
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions";
export interface languageState {
    language: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const defaultState: languageState = {
    language: "zh",
    languageList: [
        { name: "中文", code: "zh" },
        { name: "English", code: "en" }
    ],
}


export const LanguageReducer = (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case ADD_LANGUAGE:
            return { ...state, languageList: [...state.languageList, action.payload] };
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload }
        default:
            return state;
    }
}