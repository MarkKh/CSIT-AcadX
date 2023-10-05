import React from "react";
import Bg from '../../assets/bg-rep.jpg'; // ตรวจสอบ path ของรูปภาพให้ถูกต้อง

const heroStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${Bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
};
export default function CoopHero() {
    return (
        <div className="py-16" style={heroStyle}>
            <div className="container mx-auto">
                <h2 className="text-4xl text-gray-700 font-bold text-center mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>UGThesis and Co-op Reports</h2>
                <p className="text-xl text-center">รายงานวิทยานิพนธ์ และสหกิจศึกษา</p>
            </div>
        </div>
    );
}
