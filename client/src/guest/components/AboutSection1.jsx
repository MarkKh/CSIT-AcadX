import React from 'react';
import undergraduate from '../assets/undergraduate.jpg'

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-24 lg:overflow-visible lg:px-0">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-indigo-600">Spectacular</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Undergraduate Thesis</h1>
                                <p className="mt-6 text-sm md:text-base font-normal leading-8 text-gray-700">
                                    An "Undergraduate Thesis" represents a significant academic achievement for undergraduate students pursuing their degrees. This academic endeavor signifies the culmination of their undergraduate education and is typically undertaken during the final year of study.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden lg:rounded-xl">
                        <img className="mx-auto max-w-full h-auto object-cover bg-gray-900 shadow-xl ring-1 ring-gray-400/10 rounded-md border border-gray-300" src={undergraduate} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
