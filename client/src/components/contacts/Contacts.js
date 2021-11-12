import React, { useContext, Fragment, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts, loading } = contactContext;
    // check useEffect is null or not
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ContactFilter />
            {!loading ? (
                <TransitionGroup>
                    {!filtered && contacts.map(contact => (
                        <CSSTransition key={contact._id} timeout={200} classNames="my-node">
                            <ContactItem contact={contact}></ContactItem>
                        </CSSTransition>
                    ))}

                    {filtered && filtered.map(contact => (
                        <CSSTransition key={contact._id} timeout={200} classNames="my-node">
                            <ContactItem contact={contact}></ContactItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            ) : (
                <p>Loading...</p>
            )}
        </Fragment>
    );
}


export default Contacts;