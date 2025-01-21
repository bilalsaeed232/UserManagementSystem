// app/hooks/useLogin.js

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigation = useNavigate(); // Use React Router's history hook

    const { setUser } = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    // Get the API base URL from environment variables
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(
        apiUrl
    );
    

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ 
            ...prevData,
            [name]: value,
        }));
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // send POST request to Login API
            const response = await fetch(`${apiUrl}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login Successful');
                setFormData({ email: '', password: '' });
                setUser(data.user);
                navigation.push('/'); // Use React Router to navigate
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
};

export default useLogin;
