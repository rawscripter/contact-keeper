import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertRducer';
import { SET_ALERT, REMOVE_ALERT } from '../types.js';
import { v4 as uuidv4 } from 'uuid';

const AlertState = props => {
    const initialState = [

    ];
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // set alert
    const setAlert = (msg, type) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { id, msg, type }
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
    }

    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;