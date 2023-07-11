
import {
    FETCH_RECOMMEND_PRODUCT_START,
    FETCH_RECOMMEND_PRODUCT_SUCCESS,
    FETCH_RECOMMEND_PRODUCT_FAIL,
    RecommendProductActions,
    fetchRecommendProductFailActionCreator,
    fetchRecommendProductStartActionCreator,
    fetchRecommendProductSuccessActionCreator
} from "./RecommendProductActions"

interface RecommendProductState {
    loading: boolean,
    error: null | string,
    productList: any[]
}

const defaultState: RecommendProductState = {
    loading: true,
    error: null,
    productList: [],
}

export const RecommendProductReducer = (state = defaultState, action: RecommendProductActions) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCT_START:
            return { ...state, loading: true };
        case FETCH_RECOMMEND_PRODUCT_SUCCESS:
            return { ...state, loading: false, productList: action.payload };
        case FETCH_RECOMMEND_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }

}

