import React from 'react';
import Typed from 'react-typed';
import { Link } from "react-router-dom";
import backgroundImage from '../assets/bg-index.png';

const HeroSection = () => {
    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">CSIT AcadX</h1>
                <p className="mb-6 text-sm md:text-base font-normal text-gray-600 sm:px-16 xl:px-48 dark:text-gray-600">
                    "CSIT" represents the academic field, while "AcadX" combines the concept of an academy with a modern and concise twist. The "X" adds a contemporary touch to the name, making it catchy and memorable.
                </p>


                <div><Typed
                    className='text-lg md:text-xl lg:text-2xl font-extrabold leading-none tracking-tight text-purple-400 dark:text-purple-300'
                    strings={['Information Technology', 'Computer Science', 'AcadX', 'CSIT', 'Academic', 'COOP']}
                    typeSpeed={50}
                    backSpeed={50}
                    loop
                />
                </div>
                <br></br>

                <Link to='/reports'><a href="#" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900">
                    Get Started
                    <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;
