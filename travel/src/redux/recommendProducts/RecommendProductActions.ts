export const FETCH_RECOMMEND_PRODUCT_START = "FETCH_RECOMMEND_PRODUCT_START";
export const FETCH_RECOMMEND_PRODUCT_SUCCESS = "FETCH_RECOMMEND_PRODUCT_SUCCESS";
export const FETCH_RECOMMEND_PRODUCT_FAIL = "FETCH_RECOMMEND_PRODUCT_FAIL";

interface FetchRecommendProductStart {
    type: typeof FETCH_RECOMMEND_PRODUCT_START,
}
interface FetchRecommendProductSuccess {
    type: typeof FETCH_RECOMMEND_PRODUCT_SUCCESS,
    payload: any,
}
interface FetchRecommendProductFail {
    type: typeof FETCH_RECOMMEND_PRODUCT_FAIL,
    payload: any,
}

export type RecommendProductTypes = FetchRecommendProductStart | FetchRecommendProductSuccess | FetchRecommendProductFail;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStart => {
    return {
        type: FETCH_RECOMMEND_PRODUCT_START,
    };
}
export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccess => {
    return {
        type: FETCH_RECOMMEND_PRODUCT_SUCCESS,
        payload: data,
    };
}
export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFail => {
    return {
        type: FETCH_RECOMMEND_PRODUCT_FAIL,
        payload: error,
    };
}
