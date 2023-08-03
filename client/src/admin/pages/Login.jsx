import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios using "npm install axios"

import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { Label, Input, Button } from '@windmill/react-ui';
import Swal from 'sweetalert2';
import { LoginApi } from "../../utils/routh"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LoginApi, { username, password });
      const { message, token } = response.data;
      if (message === 'Login successful') {
        // Save the token to localStorage or cookies for future API calls
        localStorage.setItem('token', token);
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
          timer: 2000, // Display the alert for 2 seconds
          showConfirmButton: false, // Hide the "OK" button
        }).then(() => {
          // Redirect the user to the admin page after the alert is closed
          history.push('/admin');
        });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };
  // Check if the user is already authenticated (e.g., has a valid token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect the user to the admin page
      history.push('/admin');
    }
  }, []);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={handleLogin}>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="john@doe.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Label>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>
              </form>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
