import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // ensures cookies are sent with the request
            });

            if (response.ok) {
                router.push('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }

        router.push('/login');
    };

    return (
        <button 
            className="bg-red-600 py-2 px-4 text-white hover:bg-blue-700 disabled:bg-gray-400" 
            onClick={handleClick}
        >
            Logout
        </button>
    );
};

export default LogoutButton;
