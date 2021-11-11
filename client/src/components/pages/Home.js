import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactFrom';


const Home = () => {
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