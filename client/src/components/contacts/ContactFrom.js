import React from 'react';
import PropTypes from 'prop-types';
import './contact.css';

const ContactFrom = () => {
    return (
        <div className="contact-form">
            <div className="contact-form__content">
                <div className="mb-3 text-center">
                    <h3>Add Contact</h3>
                </div>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" placeholder="Name" type="text" id="name" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" placeholder="Email Address" type="email" id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Phone</label>
                        <input className="form-control" placeholder="Phone Number" type="phone" id="phone" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Type</label>
                        <select className="form-control">
                            <option>Select</option>
                            <option>Personal</option>
                            <option>Professional</option>
                        </select>
                    </div>

                    <div className="form-group mt-4">
                        <button className="btn btn-primary btn-block" type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactFrom;