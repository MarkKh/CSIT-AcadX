// ReportDataToExcel.jsx

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
    Button,
} from "@windmill/react-ui";


const ReportDataToExcel = ({ dataToExcel }) => {
    const handleExportExcel = () => {
        // Create a new Workbook
        const workbook = XLSX.utils.book_new();

        // Create a new Worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataToExcel);

        // Add the Worksheet to the Workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Academic Reports");

        // Create an Excel buffer
        const excelBuffer = XLSX.write(workbook, { type: "array" });

        // Create a Blob from the buffer
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Download the Excel file
        saveAs(blob, "academic_reports.xlsx");
    };

    return (
        <div className="py-5 bg-white dark:bg-gray-800">
            <div className="flex justify-center">
                <Button layout="outline" onClick={handleExportExcel}>Export to Excel</Button>
            </div>
        </div>


    )
};

export default ReportDataToExcel;
