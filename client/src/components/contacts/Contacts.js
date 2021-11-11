import React, { useContext, Fragment, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;
    // check useEffect is null or not

    return (
        <Fragment>
            <TransitionGroup>

                <ContactFilter />
                {!filtered && contacts.map(contact => (
                    <CSSTransition key={contact.id} timeout={200} classNames="my-node">
                        <ContactItem contact={contact}></ContactItem>
                    </CSSTransition>
                ))}

                {filtered && filtered.map(contact => (
                    <CSSTransition key={contact.id} timeout={200} classNames="my-node">
                        <ContactItem contact={contact}></ContactItem>
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </Fragment>
    );
}


export default Contacts;