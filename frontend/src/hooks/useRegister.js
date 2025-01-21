// app/hooks/useRegister.js

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router v6's useNavigate hook

const useRegister = () => {
    const navigate = useNavigate(); // Using React Router's useNavigate hook for navigation
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Get the API base URL from environment variables
    const apiUrl = process.env.REACT_APP_API_URL;

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
            // Send POST request to register API
            const response = await fetch(`${apiUrl}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Registration successful!');
                setFormData({ email: '', password: '', name: '' });
                navigate("/"); // Use navigate to redirect after successful registration
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred during registration.');
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
        handleSubmit
    };
};

export default useRegister;
