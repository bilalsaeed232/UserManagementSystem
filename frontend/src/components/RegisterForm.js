"use client"

// app/components/RegisterForm.jsx
import React from 'react'
import useRegister from '../hooks/useRegister'

const RegisterForm = () => {
    const {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit
    } = useRegister();
    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">Register User</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id='email'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id='password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className='flex justify-between pt-3 text-sm'>
                <span>Already a user?</span>
                <a href='/login' className='text-blue-500'>Login</a>
            </div>

            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
            {success && <p className=" text-green-500 text-sm pt-2">{success}</p>}
        </div>
    )
}

export default RegisterForm