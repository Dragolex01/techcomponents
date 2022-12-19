import axios from 'axios';
import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL
} from './types';

export const get_products = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get('http://localhost:8000/api/product/get-products', config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        })
    }
}

export const get_product = (productId) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://localhost:8000/api/product/product/${productId}`, config);
        
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_FAIL
        });
    }
}