import React from "react";
import Bg from '../../assets/bg-rep.jpg'; // ตรวจสอบ path ของรูปภาพให้ถูกต้อง
import Typed from 'react-typed';

const heroStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${Bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
};
export default function CoopHero() {
    return (
        <div className="py-16" style={heroStyle}>
            <div className="container mx-auto text-center">
                <h2 className="lg:text-4xl sm:text-3xl text-gray-700 font-bold text-center mb-2 " style={{ fontFamily: 'Inter, sans-serif' }}>UGThesis and Co-op Reports</h2>
                <div>
                    <Typed
                        className='text-lg md:text-xl lg:text-xl  leading-none tracking-tight text-gray-600 dark:text-gray-600'
                        strings={['รายงานวิทยานิพนธ์ และสหกิจศึกษา']}
                        typeSpeed={100}
                        backSpeed={50}
                        loop
                    />
                </div>
            </div>
        </div>
    );
}
