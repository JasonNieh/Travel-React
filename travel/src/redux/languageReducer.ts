
import i18n from "i18next";
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


export const LanguageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "add_language":
            return { ...state, languageList: [...state.languageList, action.payload] };
        case "change_language":
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload }
        default:
            return state;
    }
}