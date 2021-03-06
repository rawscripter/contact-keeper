import React from 'react';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

import setAuthToken from '../../utils/setAuthToken'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: null,
        user: null,
        error: null
    }

    const [state, dispatch] = React.useReducer(AuthReducer, initialState)

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth')

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }


    // Register User
    const register = async formData => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser();

        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }


    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/api/auth', formData, config).then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();

        }).catch(err => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        })

    }





    // Logout User
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }


    // Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                logout,
                login,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;
