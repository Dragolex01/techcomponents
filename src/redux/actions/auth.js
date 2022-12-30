import axios from 'axios';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT,
} from './types';
import { setAlert } from './alert';


export const check_authenticated = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post('http://localhost:8000/auth/jwt/verify/', body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    });

    try {
        const res = await axios.post('http://localhost:8000/auth/users/', body, config);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Se ha registrado correctamente', 'green'));
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error al crear cuenta', 'red'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        if(err.response.status === 400){
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Los datos introducidos no son validos', 'red'));
        }else{
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'red'));
        }
    }
};

export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get('http://localhost:8000/auth/users/me/', config);
        
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const login = (email, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post('http://localhost:8000/auth/jwt/create/', body, config);
    
        if(res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Inicio de sesión con éxito', 'green'));
        }else {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al iniciar sesion.', 'red'));
        }
    }
    catch(err){
        if(err.response.status === 401){
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('El usuario o contraseña introducidos son incorrectos.', 'red'));
        }else{
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al iniciar sesion. Intenta mas tarde', 'red'));
        }

    }
}

export const activate = (uid, token) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post('http://localhost:8000/auth/users/activation/', body, config);
    
        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS
            });
        } else {
            dispatch({
                type: ACTIVATION_FAIL
            });
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
    catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
};

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post('http://localhost:8000/auth/jwt/refresh/', body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch(setAlert('Succesfully logged out', 'green'));
}