import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorObject, setErrorObject] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = validateInputs();
    if (Object.keys(currentErrors).length > 0) {
      setErrorObject(currentErrors);
      return;
    }

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  }

  const validateInputs = () => {
    const errorObj = {};
    if (username.length >= 40) errorObj["username"] = "Username must be 40 characters or less";
    if (!username.length) errorObj["username"] = "Username cannot be blank";
    if (username.includes('@')) errorObj["username"] = "Username cannot be an email";
    if (email.length >= 255) errorObj["email"] = "Email must be must be 255 characters or less";
    if (!email.length) errorObj["email"] = "Email cannot be blank";
    if (!email.includes('@') || !email.includes('.')) errorObj["email"] = "Invalid email";
    if (password !== confirmPassword) errorObj['password'] = 'Passwords must match';
    if (password.length < 8) errorObj['password'] = "Password must be at least 8 characters long";
    return errorObj;
  }

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="signup-title-container">
        <h1>Sign Up</h1>
        <NavLink exact to="/login"><h1>Or Log In</h1></NavLink>
      </div>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h3>Sign up</h3>
          <div className="signup-input-container">
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              Email Address
            </label>
            {errorObject.email && <p className='errors'>{errorObject.email}</p>}
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              Username
            </label>
            {errorObject.username && <p className='errors'>{errorObject.username}</p>}
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              Password
            </label>
            {errorObject.password && <p className='errors'>{errorObject.password}</p>}
            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              Confirm Password
            </label>
          </div>
          <div className="signup-button-container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    </>
  );
}

export default SignupFormPage;
