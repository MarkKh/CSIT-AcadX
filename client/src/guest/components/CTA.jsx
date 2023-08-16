import React from 'react';
import CSITlogo from '../assets/csit-logo.png';
import Scilogo from '../assets/sci-logo.png';
import NUlogo from '../assets/nu-logo.png';

export default function Example() {
    return (
        <div className="bg-white py-16 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <h2 className="text-lg font-semibold leading-8 text-gray-900">
                    Trusted by the world’s most innovative teams
                </h2>
                <div className="flex justify-center items-center mt-4 space-x-6">
                    <img
                        className="max-h-20 w-full object-contain sm:w-1/3 md:w-1/4 lg:w-1/5"
                        src={CSITlogo}
                        alt="CSIT Logo"
                    />
                </div>
            </div>
        </div>
    );
}
