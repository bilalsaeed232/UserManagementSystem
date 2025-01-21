// app/components/LoginForm.js
import React from 'react';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom'; // Using React Router for navigation

const LoginForm = () => {
    const {
        formData,
        success,
        error,
        handleSubmit,
        handleChange
    } = useLogin();

    return (
        <div className='max-w-md border p-6 border-gray-300 rounded-lg shadow-md'>
            <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <button className='w-full bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 disabled:bg-gray-400'>
                    Sign in
                </button>

                <div className='flex justify-between pt-3 text-sm'>
                    <span>Not a user?</span>
                    <Link to='/register' className='text-blue-500'>Register</Link>
                </div>

                {success && <p className="text-green-500 text-sm pt-2">{success}</p>}
                {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
