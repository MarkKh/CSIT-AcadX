import React from 'react';
import internship from '../assets/internship.jpg';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-24 lg:overflow-visible lg:px-0">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-indigo-600">More experienced</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cooperative Education</h1>
                                <p className="mt-6 text-sm md:text-base font-normal leading-8 text-gray-700">
                                    "Cooperative Education" or "Co-op" is an educational format that seamlessly blends theoretical knowledge acquired in the classroom with practical work experiences. In this general framework, students are placed in real-world work settings during their academic semesters. Simultaneously, they are assessed and receive academic credits for their participation. Additionally, students are required to prepare an academic report, typically one volume, as stipulated by the organization hosting the co-op program and the supervising faculty advisor.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden lg:rounded-xl">
                        <img className="mx-auto max-w-full h-auto object-cover bg-gray-900 shadow-xl ring-1 ring-gray-400/10 rounded-md border border-gray-300" src={internship} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
