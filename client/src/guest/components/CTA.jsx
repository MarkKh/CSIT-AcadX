import React from 'react';
import CSITlogo from '../assets/csit-logo.png';
import CSITut from '../assets/csit-ut.png';
import SciCoop from '../assets/sci-coop.png';

export default function Example() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mt-4 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <a href="https://www.sci.nu.ac.th/coop/">
                        <img
                            className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
                            src={SciCoop}
                            alt="SciCoop"
                            style={{
                                transition: 'transform 0.2s',
                                transformOrigin: 'center',
                                display: 'block',
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </a>
                    <a href="https://csit.nu.ac.th/">
                        <img
                            className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
                            src={CSITlogo}
                            alt="CSITlogo"
                            style={{
                                transition: 'transform 0.2s',
                                transformOrigin: 'center',
                                display: 'block',
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </a>
                    <a href="https://csit.nu.ac.th/?page_id=350">
                        <img
                            className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
                            src={CSITut}
                            alt="CSITut"
                            style={{
                                transition: 'transform 0.2s',
                                transformOrigin: 'center',
                                display: 'block',
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
