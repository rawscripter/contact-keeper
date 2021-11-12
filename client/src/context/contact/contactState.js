import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types'



const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        loading: true,
        error: null
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (err) {
            console.error(err.message);
        }
    }


    // Add Contact
    const addContact = async contact => {
        // add new contact to databse 
        let res = await axios.post('/api/contacts', contact);
        try {
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            console.log(err);
        }

    }
    // Delete Contact
    const deleteContact = async contact => {

        let id = contact._id;
        let res = await axios.delete(`/api/contacts/${id}`);

        try {
            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (err) {
            console.log(err);
        }
    }
    // Set Current Contact 
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    // Update Contact
    const updateContact = async contact => {
        let id = contact._id;
        let res = await axios.put(`/api/contacts/${id}`, contact);

        try {
            dispatch({ type: UPDATE_CONTACT, payload: res.data })
        } catch (err) {
            console.log(err);
        }

    }

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    // Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            loading: state.loading,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts,
            getContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};
export default ContactState;