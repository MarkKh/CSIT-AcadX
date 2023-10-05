import React from 'react';
import CSITlogo from '../assets/csit-logo.png';

export default function Example() {
    return (
        <div className="bg-white py-16 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="flex justify-center items-center mt-4 space-x-6">
                    <p className="text-3xl font-bold text-blue-500 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400" style={{ fontFamily: 'Inter, sans-serif' }}>Co-op</p>
                    <img
                        className="max-h-20 w-full object-contain sm:w-1/3 md:w-1/4 lg:w-1/5"
                        src={CSITlogo}
                        alt="CSIT Logo"
                    />
                    <p className="text-3xl font-bold text-pink-500 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-400" style={{ fontFamily: 'Inter, sans-serif' }}>UG Thesis</p>
                </div>
                <br></br>
            </div>
        </div>
    );
}
