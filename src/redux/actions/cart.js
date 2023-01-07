import axios from 'axios';
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
} from './types';

export const add_item = (product, count) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        const product_id = product.id;
        const body = JSON.stringify({
            product_id,
            count
        })

        try{
            const res = await axios.post('http://localhost:8000/api/cart/add-item', body, config);
            
            if(res.status === 201){
                dispatch({
                    type: ADD_ITEM_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: ADD_ITEM_FAIL
                })
            }
        }catch(err){
            dispatch({
                type: ADD_ITEM_FAIL
            })
        }
    }
}

export const get_items = () => async dispath => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try{
            const res = await axios.get('http://localhost:8000/api/cart/cart-items', config);

            if(res.status === 200){
                dispath({
                    type: GET_ITEMS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispath({
                    type: GET_ITEMS_FAIL
                })
            }
        }catch(err){
            dispath({
                type: GET_ITEMS_FAIL
            })
        }
    }
}

export const get_total = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try{
            const res = await axios.get('http://localhost:8000/api/cart/get-total', config);

            if(res.status === 200){
                dispatch({
                    type: GET_TOTAL_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: GET_TOTAL_FAIL
                })
            }
        }catch(err){
            dispatch({
                type: GET_TOTAL_FAIL
            })
        }
    }
}

export const get_item_total = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.get('http://localhost:8000/api/cart/get-item-total', config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEM_TOTAL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ITEM_TOTAL_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_ITEM_TOTAL_FAIL
            });
        }
    }
}

export const update_item = (item, count) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        const product_id = item.product.id;
        const body = JSON.stringify({
            product_id, count
        });

        try {
            const res = await axios.put('http://localhost:8000/api/cart/update-item', body, config);

            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: UPDATE_ITEM_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: UPDATE_ITEM_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: UPDATE_ITEM_FAIL
            });
        }
    }
}

export const remove_item = item => async dispatch => {
    if (localStorage.getItem('access')) {
        const product_id = item.product.id;
        const body = JSON.stringify({ product_id });


        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            data: body
        };

        try {
            const res = await axios.delete('http://localhost:8000/api/cart/remove-item', config);
            
            if (res.status === 200) {
                dispatch({
                    type: REMOVE_ITEM_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REMOVE_ITEM_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: REMOVE_ITEM_FAIL
            });
        }
    }
}

export const empty_cart = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.delete('http://localhost:8000/api/cart/empty-cart', config);

            if (res.status === 200) {
                dispatch({
                    type: EMPTY_CART_SUCCESS
                });
            } else {
                dispatch({
                    type: EMPTY_CART_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: EMPTY_CART_FAIL
            });
        }
    }
}