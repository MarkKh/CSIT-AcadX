import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
    Badge,
} from "@windmill/react-ui";
import Swal from 'sweetalert2'
import dayjs from 'dayjs';

import Popup from "../components/Laon/LoanPopup"
import LoanTable from "../components/Laon/LoanTable"
import LoanFilter from "../components/Laon/LoanFilter"
import LoanSearch from "../components/Laon/LoanSearch"
import LoanExcel from "../components/Laon/LoanDataToExcel"

import { getAllLoan, getAllReport, delLoan, loanReport, loanReturn } from "../../utils/routh"

function Loan() {
    const resultsPerPage = 10;
    const [loan, setLoan] = useState([]);
    const [dataLoan, setDataLoan] = useState([]);
    const [response, setResponse] = useState([]);
    const [report, setReport] = useState([]);
    const [search, setSearch] = useState("");
    const [popupData, setPopupData] = useState(null);

    const fetchData = async () => {
        try {
            const [loanRes, reportRes] = await Promise.all([
                axios.get(getAllLoan),
                axios.get(getAllReport)
            ])
            setResponse(loanRes.data)

            const reportMap = {};
            reportRes.data.forEach(report => {
                reportMap[report.rep_code] = report.title;
            });

            setReport(reportMap);
            setReport(reportMap)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const [selectedFilters, setSelectedFilters] = useState({
        rep_code: "",
        borrower_id: "",
        borrower_name: "",
        major: "",
        status: ""
    });

    const clearFilters = () => {
        setSelectedFilters({
            rep_code: "",
            borrower_id: "",
            borrower_name: "",
            major: "",
            status: ""
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setDataLoan(
            response
                .filter(filterLoan)
                .slice((loan - 1) * resultsPerPage, loan * resultsPerPage)
        );
    }, [loan, response, selectedFilters, search]);

    const handleSelectFilter = (filterName, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const filterLoan = (loanItem) => {
        const { rep_code, borrower_id, borrower_name, major, status } = selectedFilters;
        return (
            (search.toLowerCase() === "" ||
                loanItem.rep_code.toLowerCase().includes(search.toLowerCase()) ||
                loanItem.borrower_id.toLowerCase().includes(search.toLowerCase()) ||
                loanItem.borrower_name.toLowerCase().includes(search.toLowerCase()) ||
                report[loanItem.rep_code].toLowerCase().includes(search.toLowerCase())
            ) &&
            (rep_code === "" || loanItem.rep_code === rep_code) &&
            (borrower_id === "" || loanItem.borrower_id === borrower_id) &&
            (borrower_name === "" || loanItem.borrower_name === borrower_name) &&
            (major === "" || loanItem.major === major) &&
            (status === "" || loanItem.status === status)

        )
    }

    const handleDelete = async (rep_code, loan_id) => {
        const shouldDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (shouldDelete.isConfirmed) {
            try {
                await axios.delete(`${delLoan}${loan_id}`);
                await axios.put(`${loanReport}${rep_code}`, { status: "มีให้ยืม", end_date: dayjs().format('YYYY-MM-DD') });
                fetchData();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the loan.',
                    'error'
                );
                console.error("Error:", error);
            }
        }
    };

    const handleReturn = async (loan_id, loanStatus, rep_code) => {
        let title, confirmButtonText;

        if (loanStatus === "InActive") {
            title = 'You have returned this item.';
            confirmButtonText = 'Update Return';
            try {
                await Swal.fire({
                    title: title,
                    showCancelButton: true,
                });
            } catch (error) {
                console.error('Error showing Swal:', error);
            }
        } else {
            title = 'Do you want to return?';
            confirmButtonText = 'Return';

            try {
                const result = await Swal.fire({
                    title: title,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: confirmButtonText,
                    denyButtonText: `Don't return`,
                });

                if (result.isConfirmed) {
                    try {
                        await axios.put(`${loanReturn}${loan_id}`, { status: "InActive", end_date: new Date().toISOString().slice(0, 10) });
                        await axios.put(`${loanReport}${rep_code}`, { status: "มีให้ยืม" });
                        Swal.fire('Returned!', '', 'success');
                        fetchData();
                    } catch (error) {
                        console.error('Error updating return status:', error);
                        Swal.fire('Error!', 'An error occurred while updating return status.', 'error');
                    }
                } else if (result.isDenied) {
                    Swal.fire('Not returned', '', 'info');
                }
            } catch (error) {
                console.error('Error showing Swal:', error);
            }
        }
    };

    const openPopup = (data) => {
        setPopupData(data);
    };

    const closePopup = () => {
        setPopupData(null);
        fetchData();
    };


    const dataToExcel = response.filter(filterLoan)

    return (
        <>
            <PageTitle>Loan-Return Management</PageTitle>

            <div className="flex items-center justify-between">
                <SectionTitle className="mr-2">Search & Filter</SectionTitle>
                <div className="flex py-4 justify-end">
                    <Badge type="primary">   Found {dataToExcel.length} item   </Badge>
                </div>
            </div>

            <LoanSearch setSearch={setSearch} />

            <LoanFilter
                selectedFilters={selectedFilters}
                response={response}
                handleSelectFilter={handleSelectFilter}
                clearFilters={clearFilters}
            />

            <LoanTable
                dataLoan={dataLoan}
                response={response}
                filterLoan={filterLoan}
                report={report}
                setLoan={setLoan}
                handleDelete={handleDelete}
                handleReturn={handleReturn}
                openPopup={openPopup}
            />

            <LoanExcel
                dataToExcel={dataToExcel}
            />

            {popupData && <Popup data={popupData} onClose={closePopup} />}


        </>
    );
}

export default Loan;
