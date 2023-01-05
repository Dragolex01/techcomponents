import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCTS_BY_PAGE_SUCCESS,
    GET_PRODUCTS_BY_PAGE_FAIL,
    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_FAIL
} from '../actions/types';

// const initialState = {
//     total_pages: 0,
//     page: 0,
//     products: null,
//     products_by_page: null,
//     product: null
// }

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

        // case GET_PRODUCTS_BY_PAGE_SUCCESS:
        //     return{
        //         ...state,
        //         products_by_page: payload.products,
        //         total_pages: payload.total_pages,
        //         page: payload.page
        //     }
        // case GET_PRODUCTS_BY_PAGE_FAIL:
        //     return {
        //         ...state,
        //         products_by_page: null,
        //         total_pages: 0,
        //         page: 0
        //     }
        
        default:
            return state
    }
}