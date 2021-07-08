import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignUpForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='SignUpFormCont'>
      <form className='SignUpForm' onSubmit={handleSubmit}>
        <div className='SignUpFormTitle'>
          Sign Up
        </div>
        <ul style={{ display: errors.length ? 'block' : 'none' }}>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className='SignUpFormLabel'>
          Email:
          <input
            className='SignUpFormInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='SignUpFormLabel'>
          Username:
          <input
            className='SignUpFormInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className='SignUpFormLabel'>
          Password:
          <input
            className='SignUpFormInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className='SignUpFormLabel'>
          Confirm Password:
          <input
            className='SignUpFormInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className='SignUpFormButton' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
