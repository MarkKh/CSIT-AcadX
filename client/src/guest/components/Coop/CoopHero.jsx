import React from "react";
import Bg from '../../assets/bg-coop.jpg'; // ตรวจสอบ path ของรูปภาพให้ถูกต้อง

const heroStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${Bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
};

export default function CoopHero() {
    return (
        <div className="py-16" style={heroStyle}>
            <div className="container mx-auto">
                <h2 className="text-4xl text-gray-800 font-bold text-center mb-2">Co-op Education Places</h2>
                <p className="text-xl text-center">สถานที่ฝึกสหกิจศึกษา</p>
            </div>
        </div>
    );
}
