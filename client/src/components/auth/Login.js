import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/alertContext';
const Login = (props) => {
    const authContext = React.useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;

    const alertContext = React.useContext(AlertContext);
    const { setAlert } = alertContext;

    const [user, setUser] = useState({
        email: 'shuvo@gmail.com',
        password: '123456',
    });

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect to home page
            props.history.push('/');
        }
        if (error === 'Invalid Credentials') {
            // Show error message
            setAlert(error, 'danger');
            // clear error message
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            console.log('Please enter all fields');
        } else {
            login({
                email,
                password,
            });
        }


    };


    return (

        <div className="row">
            <div className="col-4 m-auto">
                <div className="form-container">
                    <div className="mt-3 mb-5 text-center">
                        <h4>Login Here</h4>
                    </div>
                    <form onSubmit={e => onSubmit(e)}>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={e => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={e => onChange(e)} required minLength="6" />
                        </div>

                        <div className="form-group mt-3">
                            <input type="submit" value="Register" className="btn btn-primary btn-block" />
                        </div>
                        <div className="form-group mt-3">
                            don't have an account? <Link to="/register">Register now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login;