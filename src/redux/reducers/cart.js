import {
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAIL,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
    GET_TOTAL_SUCCESS,
    GET_TOTAL_FAIL,
    GET_ITEM_TOTAL_SUCCESS,
    GET_ITEM_TOTAL_FAIL,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAIL,
    EMPTY_CART_SUCCESS,
    EMPTY_CART_FAIL
} from '../actions/types';

const initialState = {
    items: null,
    amount: 0.00,
    total_items: 0
}

export default function Cart(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case ADD_ITEM_SUCCESS:
            return{
                ...state,
                items: payload.cart
            }
        case ADD_ITEM_FAIL:
            return{
                ...state,
                items: null
            }
        
        case GET_ITEMS_SUCCESS:
            return{
                ...state,
                items: payload.cart
            }
        case GET_ITEMS_FAIL:
            return{
                ...state,
                items: null
            }

        case GET_TOTAL_SUCCESS:
            return{
                ...state,
                amount: payload.total_cost
            }
        case GET_TOTAL_FAIL:
            return{
                ...state,
                amount: 0.00
            }

        case GET_ITEM_TOTAL_SUCCESS:
            return{
                ...state,
                total_items: payload.total_items
            }
        case GET_ITEM_TOTAL_FAIL:
            return{
                ...state,
                total_items: 0
            }
        
        case UPDATE_ITEM_SUCCESS:
            return{
                ...state,
                items: payload.cart
            }
        case UPDATE_ITEM_FAIL:
            return{
                ...state
            }

        case REMOVE_ITEM_SUCCESS:
            return{
                ...state,
                items: payload.cart
            }
        case REMOVE_ITEM_FAIL:
            return{
                ...state
            }

        case EMPTY_CART_SUCCESS:
        case EMPTY_CART_FAIL:
            return{
                ...state,
                items: null,
                amount: 0.00,
                total_items: 0
            }

        default:
            return state
    }
}