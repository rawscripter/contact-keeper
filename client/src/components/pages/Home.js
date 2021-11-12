import React, { useEffect, useContext } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactFrom';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);


    return (
        <div>
            <div className="row">
                <div className="col-md-4 ">
                    <ContactForm />
                </div>
                <div className="col-md-2 ">
                </div>
                <div className="col-md-6 ">
                    <Contacts />
                </div>
            </div>
        </div>
    );
};


export default Home;