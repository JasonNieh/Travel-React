
// import i18next from "i18next";
export interface languageState {
    language: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const defaultState: languageState = {
    language: "zh",
    languageList: [
        { name: "English", code: "en" },
        { name: "中文", code: "zh" }
    ],
}


export const LanguageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "add_language":
            //i18next.changeLanguage(action.payload);
            return { ...state, languageList: [...state.languageList, action.payload] };
        case "change_language":
            return { ...state, language: action.payload }
        default:
            return state;
    }

    return state;
}