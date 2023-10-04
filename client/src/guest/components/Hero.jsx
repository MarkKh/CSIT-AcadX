import React from 'react';
import Typed from 'react-typed';
import { Link } from "react-router-dom";
import Bg from '../assets/bg-4.jpg';

const HeroSection = () => {
    return (
        <div className="flex justify-center items-center min-h-screen" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(${Bg})`, backgroundSize: 'cover', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
            <div className="text-center">
                <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>CSIT AcadX</h1>
                <p className="mb-6 text-sm md:text-sm lg:text-base font-normal text-gray-700 sm:px-8 md:px-16 xl:px-48 mx-4 dark:text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    CSIT AcadX stands for Academic Reports and Co-op study at Computer Science and Information Technology. The website contains information of past Undergraduate Thesis and Co-op study reports and Co-op study places, which is useful for current and future students of CSIT.
                </p>



                <div>
                    <Typed
                        className='text-lg md:text-xl lg:text-2xl font-extrabold leading-none tracking-tight text-purple-700 dark:text-purple-600'
                        strings={['รายงานสารนิพนธ์และการออกสหกิจศึกษา ภาควิชาวิทยาการคอมพิวเตอร์ฯ']}
                        typeSpeed={100}
                        backSpeed={50}
                        loop
                    />
                </div>
                <br />

                <Link to='/reports'>
                    <p className="inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm lg:text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Get Started
                        <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </p>
                </Link>


            </div>
        </div>
    );
};

export default HeroSection;
