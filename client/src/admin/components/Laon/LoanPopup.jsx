import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Select } from "@windmill/react-ui";
import "../utils/Popup.css";
import Swal from 'sweetalert2'

function Popup({ data, onClose }) {
    const [formData, setFormData] = useState(data);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/loan/${data.loan_id}`, formData);
            onClose();
            Swal.fire(
                'Update successfully',
                'Good job bro!',
                'success'
            )
        } catch (error) {
            console.error("Error updating report:", error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const majors = [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Information Technology", label: "Information Technology" },
        { value: "etc", label: "Teacher, administrator, etc." },
    ];

    const statusOptions = [
        { value: "Active", label: "Active" },
        { value: "InActive", label: "InActive" },
    ];



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg overflow-y-auto popup">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Information</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="text-sm">
                    <table className="w-full">
                        <tbody>
                            {Object.entries(formData).map(([field, value]) => {
                                if (field === 'loan_id' || field === 'rep_code' || field === 'start_date' || field === 'end_date') {
                                    // แสดงเฉพาะข้อมูลเท่านั้น ไม่ให้แก้ไข
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{field}</td>
                                            <td>
                                                <Input
                                                    disabled
                                                    type="text"
                                                    name={field}
                                                    value={value}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                    );
                                } else if (field === 'major') {
                                    // แสดงฟิลด์ major และ status เป็นตัวเลือกในการแก้ไข
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{field}</td>
                                            <td>
                                                <Select
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                >
                                                    {majors.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </td>
                                        </tr>
                                    );
                                }else if (field === 'status') {
                                    // แสดงฟิลด์ major และ status เป็นตัวเลือกในการแก้ไข
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{field}</td>
                                            <td>
                                                <Select
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                >
                                                    {statusOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    // แสดงข้อมูลอื่น ๆ และอนุญาตให้แก้ไข
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{field}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                            })}

                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
                    <Button onClick={onClose} size="small" className="mr-2">
                        Close
                    </Button>
                    <Button onClick={handleFormSubmit} size="small">
                        Save
                    </Button>
                </div>
            </div>
        </div>

    )

}
export default Popup;
