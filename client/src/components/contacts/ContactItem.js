import React, { useContext } from 'react';
import './contact.css';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({ contact }) => {
    const { id, name, email, phone, type } = contact;
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent } = contactContext;
    const onDelete = () => {
        deleteContact(id);
    };
    const onEdit = () => {
        setCurrent(contact);
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="text-left text-bolder text-dark m-0">
                    <span className=""> <strong>{name}</strong> </span>
                    {' '}
                    <span className={'badge text-normal ' + (contact.type === 'personal' ? 'bg-info' : 'bg-success')}>
                        {type.charAt(0).toUpperCase() + contact.type.slice(1)}
                    </span>
                </div>
                <ul className="mt-3 mb-4 ml-0 user-data">
                    {email && <li className=""> <i className="fas fa-envelope-open"></i> {email}</li>}
                    {phone && <li className=""> <i className="fas fa-phone"></i> {phone}</li>}
                </ul>
                <div className="button-group">
                    <button onClick={onEdit} className="btn  btn-sm btn-outline-primary">
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button onClick={onDelete} className="btn btn-sm  btn-outline-danger">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>

            </div>
        </div>
    );
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;