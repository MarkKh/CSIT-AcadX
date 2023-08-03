import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableContainer, Input, Select } from "@windmill/react-ui";
import "../utils/Popup.css";
import Swal from 'sweetalert2'
import { createLoan, loanReport } from '../../../utils/routh'

function Popup({ data, onClose }) {
    const [formData, setFormData] = useState({
        rep_code: data.rep_code,
        borrower_id: "",
        borrower_name: "",
        major: "",
        start_date: "",
        end_date: null,
        status: "Active",
    });

    const fieldDisplayNames = {
        rep_code: "Report code",
        borrower_id: "Student/Borrower ID",
        borrower_name: "Student/Borrower Name",
        major: "Major",
        start_date: "Start date",
        end_date: "End date",
        status: "Status",
    };

    const majors = [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Information Technology", label: "Information Technology" },
        { value: "etc", label: "Teacher, administrator, etc." },
    ];

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบข้อมูลว่ากรอกครบหรือไม่
        const isDataComplete = Object.values(formData).every((value) => value !== "");

        if (!isDataComplete) {
            Swal.fire("Incomplete Data", "Please fill in all required fields.", "warning");
            return; // หยุดการทำงานของฟอร์ม
        }

        try {
            // Step 1: ส่งค่าข้อมูลไปเพื่อเพิ่มรายการยืมในตาราง "loan"
            await axios.post(createLoan, formData);

            // Step 2: อัปเดตสถานะในตาราง "report"
            await axios.put(`${loanReport}${data.rep_code}`, { status: "ถูกยืม" });

            onClose();
            Swal.fire("Loan Saved!", "The loan data has been saved successfully.", "success");
        } catch (error) {
            console.error("Error saving loan:", error);
            Swal.fire("Error!", "An error occurred while saving the loan data.", "error");
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

    return (
        // ... (rest of the popup UI)

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg overflow-y-auto popup">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Loan Information</h2>
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
                    <Table>
                        <tbody>
                            {Object.entries(formData).map(([field, value]) => {
                                if (field === "start_date") {
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{fieldDisplayNames[field]}</td>
                                            <td>
                                                <Input
                                                    type="date"
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    required
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                    );
                                }

                                if (field === "major") {
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{fieldDisplayNames[field]}</td>
                                            <td>
                                                <Select
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    required
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                >
                                                    <option value="">Select major</option>
                                                    {majors.map((majorOption) => (
                                                        <option key={majorOption.value} value={majorOption.value}>
                                                            {majorOption.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </td>
                                        </tr>
                                    );
                                }

                                if (field !== "status" && field !== "end_date") { // ไม่แสดงสถานะในฟอร์ม
                                    return (
                                        <tr key={field}>
                                            <td className="pr-4 font-semibold">{fieldDisplayNames[field]}</td>
                                            <td>
                                                <Input
                                                    type="text"
                                                    name={field}
                                                    value={value}
                                                    onChange={handleFieldChange}
                                                    required
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                    );
                                }

                                return null;
                            })}
                        </tbody>
                    </Table>
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
    );
}
export default Popup;
