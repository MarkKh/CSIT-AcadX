import React from 'react';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-24 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {/* ... SVG ... */}
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</h1>
                                <p className="mt-6 text-sm md:text-base font-normal leading-8 text-gray-700">
                                    CSIT AcadX is built using cutting-edge technologies to ensure a robust and responsive user experience. The main technologies employed are:

                                    React: A popular JavaScript library for building dynamic user interfaces, ensuring a fluid and engaging front-end experience.

                                    Node.js: A powerful runtime environment for executing server-side JavaScript, enabling efficient data handling and seamless communication.

                                    MySQL: A reliable and scalable relational database management system used to securely store and manage application data.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img className="mx-auto max-w-full h-auto rounded-xl object-cover bg-gray-900 shadow-xl ring-1 ring-gray-400/10" src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="" />
                    </div>

                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                {/* ... */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
