import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './contact.css';
import ContactContext from '../../context/contact/contactContext';

const ContactFrom = () => {

    const contactContext = useContext(ContactContext);
    const { current, addContact, clearCurrent, updateContact } = contactContext;
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);


    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });


    const { name, email, phone, type } = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const submitForm = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
            clearCurrent();
        }

        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <div className="contact-form">
            <div className="contact-form__content">
                <div className="mb-3 text-center">
                    <h3>{current ? 'Edit Contact' : 'Add Contect'}</h3>
                </div>
                <form action="" onSubmit={submitForm}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={onChange} className="form-control" value={name} placeholder="Name" name="name" type="text" id="name" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email</label>
                        <input onChange={onChange} className="form-control" value={email} placeholder="Email Address" name="email" type="email" id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Phone</label>
                        <input onChange={onChange} className="form-control" value={phone} placeholder="Phone Number" name="phone" type="phone" id="phone" />
                    </div>
                    <div className="form-group mt-3">
                        <input onChange={onChange} checked={type === 'personal'} value="personal" placeholder="Type" name="type" type="radio" id="type" />
                        <label htmlFor="type">Perosnal</label>
                    </div>
                    <div className="form-group mt-3">
                        <input id="professional" onChange={onChange} checked={type === 'professional'} value="professional" placeholder="Type" name="type" type="radio" />
                        <label htmlFor="professional">Professional</label>
                    </div>

                    <div className="form-group mt-4">
                        <button className="btn btn-primary btn-block" type="submit">{current ? 'Edit Contact' : 'Add Contect'}</button>
                    </div>
                    {current &&
                        <div className="form-group mt-4">
                            <button className="btn btn-light btn-block" onClick={clearAll} type="button">Clear All</button>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}

export default ContactFrom;