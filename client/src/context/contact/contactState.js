import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'



const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'admin@gmail.com',
                phone: '1234567890',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Karen Williams',
                email: 'b@g.com',
                phone: '1234567890',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Henry Johnson',
                email: 'c@gm.com',
                phone: '1234567890',
                type: 'professional'
            }
        ],
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider value={{ contacts: state.contacts }}>
            {props.children}
        </ContactContext.Provider>
    );
};
export default ContactState;