import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/contactContext";
const Navbar = ({ title, icon }) => {
    const authContext = React.useContext(AuthContext);
    const { isAuthenticated, logout } = authContext;

    const contactContext = React.useContext(ContactContext);
    const { clearContacts } = contactContext;

    const onLogout = () => {
        clearContacts();
        logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
            <Link to="/" className="navbar-brand">
                <i className={icon}> </i> {title}
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <span onClick={onLogout} className="nav-link">
                                Logout
                            </span>
                        </li>
                    )}
                </ul>
            </div>

        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: "CKeeper",
    icon: "fas fa-id-card-alt ",
};

export default Navbar;