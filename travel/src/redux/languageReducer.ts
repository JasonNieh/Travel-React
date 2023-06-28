

export interface languageState {
    language: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const defaultState: languageState = {
    language: "zh",
    languageList: [
        { name: "English", code: "en" },
        { name: "Chinese", code: "zh" }
    ],
}


export const LanguageReducer = (state = defaultState, action) => {
    return state;
}