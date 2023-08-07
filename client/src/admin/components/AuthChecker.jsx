import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthApi } from '../../utils/routh'
import { MoonLoader } from 'react-spinners';

function AuthChecker({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // Send a request to the backend API to check authentication
                    const response = await axios.post(AuthApi, null, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const { message } = response.data;
                    if (message === 'Authentication successful') {
                        setIsAuthenticated(true);
                    } else {
                        // If authentication fails, redirect to the login page and remove the old token
                        localStorage.removeItem('token');
                        history.push('/login');
                    }
                } else {
                    // If no token is found, redirect to the login page
                    history.push('/login');
                }
            } catch (err) {
                // If an error occurs during authentication check, redirect to the login page and remove the old token
                localStorage.removeItem('token');
                history.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [history]);

    if (isLoading) {
        // You can show a loading spinner or any other loading indicator here
        return <div className="flex items-center justify-center h-screen">
            <MoonLoader color="hsla(283, 68%, 55%, 1)" />
        </div>;
    }

    if (isAuthenticated) {
        // If the user is authenticated, render the protected component or route
        return children;
    }

    if (!isAuthenticated) {
        // User is not authenticated, redirect to the login page
        history.push('/login');
        return null; // Return null to avoid rendering anything else
    }

    // If the user is not authenticated, redirect them to the login page
    return null;
}

export default AuthChecker;
