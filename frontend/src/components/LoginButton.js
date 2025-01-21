import { useNavigate } from 'react-router-dom';
import React from 'react';

const LoginButton = () => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation('/login');
    };

    return (
        <button 
            className="w-full bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 disabled:bg-gray-400" 
            onClick={handleClick}
        >
            Login
        </button>
    );
};

export default LoginButton;
