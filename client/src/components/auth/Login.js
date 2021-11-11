import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log('User Login');
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