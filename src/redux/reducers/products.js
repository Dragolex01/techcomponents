import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCTS_BY_PAGE_SUCCESS,
    GET_PRODUCTS_BY_PAGE_FAIL
} from '../actions/types';

const initialState = {
    total_pages: 0,
    page: 0,
    products: null,
    products_by_page: null,
    product: null
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

        case GET_PRODUCTS_BY_PAGE_SUCCESS:
            return{
                ...state,
                products_by_page: payload.products,
                total_pages: payload.total_pages,
                page: payload.page
            }
        case GET_PRODUCTS_BY_PAGE_FAIL:
            return {
                ...state,
                products_by_page: null
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

        default:
            return state
    }
}