// src/pages/Auth/Login.jsx
import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("login done")
    navigate("/")
    } catch (error) {
        alert('Login Error: wrong credentials')
      console.error('Login Error', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p onClick={()=>navigate("/Register")}>New User?</p>
    </div>
  );
};

export default Login;
