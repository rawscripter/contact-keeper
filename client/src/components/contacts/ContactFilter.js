import React, { useRef, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter } = contactContext;
    const text = useRef('');
    const filterConact = e => {

        if (e.target.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <div className="mb-3">
            <input
                type="text"
                value={text.current?.value}
                onChange={filterConact}
                className="form-control"
                placeholder="Search contacts..."
            />
        </div>
    );
};

export default ContactFilter;