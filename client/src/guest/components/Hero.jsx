import React from 'react';
import Typed from 'react-typed';

const HeroSection = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">The CSIT AcadX</h1>
                <p className="mb-6 text-sm md:text-base font-normal text-gray-500 sm:px-16 xl:px-48 dark:text-gray-400">
                    "CSIT" represents the academic field, while "AcadX" combines the concept of an academy with a modern and concise twist. The "X" adds a contemporary touch to the name, making it catchy and memorable.
                </p>


                <div><Typed
                    className='text-lg md:text-xl lg:text-2xl font-extrabold leading-none tracking-tight text-purple-400 dark:text-purple-300'
                    strings={['Information Technology', 'Computer Science', 'AcadX']}
                    typeSpeed={200}
                    backSpeed={250}
                    loop
                />
                </div>
                <br></br>

                <a href="#" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900">
                    Get Started
                    <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default HeroSection;
