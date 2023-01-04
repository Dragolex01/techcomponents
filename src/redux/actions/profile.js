import axios from 'axios';
import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_PHOTO_SUCCESS,
    UPDATE_USER_PROFILE_PHOTO_FAIL
} from './types';

export const get_user_profile = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try{
            const res = await axios.get('http://localhost:8000/api/profile/user', config);

            if(res.status === 200){
                dispatch({
                    type: GET_USER_PROFILE_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: GET_USER_PROFILE_FAIL
                })
            }
        }catch(err){
            dispatch({
                type: GET_USER_PROFILE_FAIL
            })
        }
    }
}

export const update_user_profile = (phone_number, region, city, province, address, postal_code) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        const body = JSON.stringify({
            phone_number,
            region,
            city,
            province,
            address,
            postal_code
        })

        try{
            const res = await axios.put('http://localhost:8000/api/profile/update', body, config);

            if(res.status === 200){
                dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                })
            }
        }catch(err){
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            })
        }
    }
}

export const update_user_photo = (photo) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        const body = JSON.stringify({
            photo
        })

        try{
            const res = await axios.put('http://localhost:8000/api/profile/update-photo', body, config);

            if(res.status === 200){
                dispatch({
                    type: UPDATE_USER_PROFILE_PHOTO_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: UPDATE_USER_PROFILE_PHOTO_FAIL
                })
            }
        }catch(err){
            dispatch({
                type: UPDATE_USER_PROFILE_PHOTO_FAIL
            })
        }
    }
}