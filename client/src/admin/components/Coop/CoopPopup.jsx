import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Select } from "@windmill/react-ui";
import "../utils/Popup.css";
import Swal from 'sweetalert2'
import { getAllAdvisor, updateCoop } from '../../../utils/routh'

function Popup({ data, onClose }) {
    const [formData, setFormData] = useState(data);
    const [advisors, setAdvisors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [advisorsResponse] = await Promise.all([
                    axios.get(getAllAdvisor),
                ]);
                const advisorsMap = {};
                advisorsResponse.data.forEach((advisor) => {
                    advisorsMap[advisor.advisor_id] = advisor.name;
                });
                setAdvisors(advisorsMap);

            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }
        fetchData();

    }, []);

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
            await axios.put(`${updateCoop}${data.coop_id}`, formData);
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

    const fieldDisplayNames = {
        coop_id: "Coop ID",
        student_id: "Student ID",
        major: "Major",
        company: "Company",
        student_name: "Student Name",
        province: "Province",
        advisor_id: "Advisor ID",
        semester: "Semester",
        year: "Year",
    }

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
                                let fieldName = fieldDisplayNames[field] || field;

                                if (field === 'coop_id') {
                                    // แสดงเฉพาะข้อมูลเท่านั้น ไม่ให้แก้ไข
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{fieldName}</td>
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
                                }

                                if (field === "advisor_id" && advisors[value]) {
                                    const currentAdvisorName = advisors[value];

                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{fieldName}</td>
                                            <td>
                                                <Select
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                >
                                                    <option value={value}>{currentAdvisorName}</option>
                                                    {Object.entries(advisors).map(([id, name]) => (
                                                        <option key={id} value={id}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </td>
                                        </tr>
                                    );
                                }
                                if (field === "semester") {
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{fieldName}</td>
                                            <td>
                                                <Select
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                </Select>
                                            </td>
                                        </tr>
                                    );
                                }
                                return (
                                    <tr key={field}>
                                        <td className="pr-4 font-semibold">{fieldName}</td>
                                        <td>
                                            <Input
                                                type="text"
                                                name={field}
                                                value={value}
                                                onChange={handleFieldChange}
                                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                            />
                                        </td>
                                    </tr>
                                )
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
