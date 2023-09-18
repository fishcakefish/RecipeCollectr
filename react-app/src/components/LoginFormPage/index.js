import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = (e) => {
    e.preventDefault()
    dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <>
      <div className="signup-title-container">
        <h1>Login</h1>
        <NavLink exact to="/signup"><h1><a>Or Sign Up</a></h1></NavLink>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="login-input-container">
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              Email Address
            </label>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              Password
            </label>
          </div>
          <div className="login-button-container">
            <button type="submit">Log In</button>
            <button id="login-demo" className='button-orange' onClick={loginDemo}>Demo User</button>
          </div>
        </form>
        <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default LoginFormPage;
