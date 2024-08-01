import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../login/login.css"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/login", { email, password });
      if (response.data === "success") {
        onLogin();
        navigate('/'); 
      } else {
        console.log(response.data);
        toast.success(response.data.msg, { position: 'top-right' });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="form-title">ADMIN-LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" placeholder="Enter your Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' required />
            <i class="fa-solid fa-envelope"></i>
            </div>
          <div className="form-group">
            <input type="password" placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' required />
            <i class="fa-solid fa-lock"></i>
            </div>
          <button type='submit' className='btn btn-primary w-100 rounded-0'> LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
