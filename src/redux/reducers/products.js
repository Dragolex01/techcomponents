import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_FAIL
} from '../actions/types';


const initialState = {
    products: null,
    product: null,
    filtered_products: null
}

export default function Products(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null
            }

        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.product
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                product: null
            }

        case FILTER_PRODUCTS_SUCCESS:
            return {
                ...state,
                filtered_products: payload.filtered_products
            }
        case FILTER_PRODUCTS_FAIL:
            return {
                ...state,
                filtered_products: null
            }
        
        default:
            return state
    }
}