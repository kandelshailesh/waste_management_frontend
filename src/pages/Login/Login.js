import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      <div class='card'>
        <form>
          <h2 class='title'> Log in</h2>

          <div class='email-login'>
            <label for='email'>
              {' '}
              <b>Email</b>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='uname'
              required
            />
            <label for='psw'>
              <b>Password</b>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='psw'
              required
            />
          </div>
          <button class='cta-btn'>Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
