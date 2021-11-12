import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/AuthContext';
const Register = (props) => {
    const alertContext = React.useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = React.useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        name: 'shuvo goswami',
        email: 'shuvo@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
            return;
        }

        register({ name, email, password });
    };


    return (

        <div className="row">
            <div className="col-4 m-auto">
                <div className="form-container">
                    <div className="mt-3 mb-5 text-center">
                        <h4>Register Free account</h4>
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" type="text" name="name" value={name} onChange={e => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={e => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={e => onChange(e)} required minLength="6" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input className="form-control" type="password" name="password2" value={password2} onChange={e => onChange(e)} required minLength="6" />
                        </div>
                        <div className="form-group mt-3">
                            <input type="submit" value="Register" className="btn btn-primary btn-block" />
                        </div>
                        <div className="form-group mt-3">
                            already have an account? <Link to="/login">Login </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Register;