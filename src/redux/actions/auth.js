import { SIGNUP_SUCCESS, SIGNUP_FAIL, ACTIVATION_SUCCESS, ACTIVATION_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING } from "./types";

import axios from "axios";


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
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
};

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




// export async function signup(first_name, last_name, email, password, re_password) {
//     return async (dispatch) => {
        
//         dispatch({
//             type: SET_AUTH_LOADING
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const body = JSON.stringify({
//             first_name,
//             last_name,
//             email,
//             password,
//             re_password
//         })

//         try {
//             const answer = await axios.post('http://localhost:8000/auth/users/', body, config);
            

//             if (answer.status === 201) {
//                 dispatch({
//                     type: SIGNUP_SUCCESS,
//                     payload: answer.data
//                 })
//             } else {
//                 dispatch({
//                     type: SIGNUP_FAIL
//                 })
//             }

//             dispatch({
//                 type: REMOVE_AUTH_LOADING
//             })

//         } catch (error) {
//             dispatch({
//                 type: SIGNUP_FAIL
//             })

//             dispatch({
//                 type: REMOVE_AUTH_LOADING
//             })
//         }
//     }
// }


// export async function activate(uid, token){
//     return async (dispatch) => {
        
//         dispatch({
//             type: SET_AUTH_LOADING
//         })
        
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
    
//         const body = JSON.stringify({
//             uid,
//             token
//         })
    
//         try{
//             const answer = await axios.post('http://localhost:8000/auth/users/', body, config);
    
//             if(answer.status === 204){
//                 dispatch({
//                     type: ACTIVATION_SUCCESS
//                 })
//             }else{
//                 dispatch({
//                     type: ACTIVATION_FAIL
//                 })
//             }

//             dispatch({
//                 type: REMOVE_AUTH_LOADING
//             })

//         }catch(error){
//             dispatch({
//                 type: ACTIVATION_FAIL
//             })

//             dispatch({
//                 type: REMOVE_AUTH_LOADING
//             })
//         }
//     }
// }



