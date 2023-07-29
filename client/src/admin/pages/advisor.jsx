import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; // Import the Link component
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Button,
    Pagination,
    Input,
    Label,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";
import Popup from "../components/Advisor/AdvisorPopup";
import Swal from 'sweetalert2'
import AdvisorTable from "../components/Advisor/AdvisorTable";
import AdvisorSearch from "../components/Advisor/AdvisorSearch";
import AdvisorForm from "../components/Advisor/AdvisorForm";
import AdvisorDataToExcel from "../components/Advisor/AdvisorDataToExcel"

function Advisor() {
    const [advisors, setAdvisors] = useState([]);
    const [dataAdvisor, setDataAdvisor] = useState([]);
    const resultsPerPage = 10;
    const [response, setResponse] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [popupData, setPopupData] = useState(null);
    const [addAdvisor, setAddAdvisor] = useState({
        name: '',
    })

    useEffect(() => {
        fetchAdvisors();
    }, []);

    const fetchAdvisors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/advisors');
            const data = response.data.sort((a, b) => a.advisor_id - b.advisor_id);
            setResponse(data);
            setDataAdvisor(data.slice(0, resultsPerPage));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (advisor_id) => {
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
                await axios.delete(`http://localhost:3000/advisor/${advisor_id}`);
                fetchAdvisors();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the report.',
                    'error'
                );
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        const filteredData = response.filter(filterAdvisor);
        const pageCount = Math.ceil(filteredData.length / resultsPerPage);
        setCurrentPage(1);
        setDataAdvisor(filteredData.slice(0, resultsPerPage));
    }, [response, search]);

    const filterAdvisor = (advisor) => {
        return (
            search.toLowerCase() === "" ||
            advisor.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        setCurrentPage(page);
        setDataAdvisor(response.slice(startIndex, endIndex));
    };

    const totalResults = response.length;
    const dataToExcel = response

    const openPopup = (data) => {
        setPopupData(data);
    };

    const closePopup = () => {
        setPopupData(null);
        fetchAdvisors();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/advisors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addAdvisor)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Advisor saved successfully:", data);
                return Swal.fire(
                    'Insert Successfully',
                    'Good job bro!',
                    'success'
                );
            }).catch((error) => {
                console.error("Error saving report:", error);
                alert("Error: " + error.message);
            })
            .then((result) => {
                // Only redirect if the SweetAlert is closed (by pressing "OK")
                if (result.isConfirmed) {
                    window.location.href = "/admin/advisor";
                }
            })

    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddAdvisor((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <PageTitle>Advisor Management</PageTitle>

            <div className="flex items-center justify-between">
                <SectionTitle>Table with actions</SectionTitle>
                <div className="flex py-4 justify-end">
                    <Badge type="primary">   Found {response.filter(filterAdvisor).length} item   </Badge>
                </div>
            </div>

            <AdvisorSearch
                search={search}
                setSearch={setSearch}
            />

            <AdvisorTable
                dataAdvisor={dataAdvisor}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalResults={totalResults}
                handleDelete={handleDelete}
                openPopup={openPopup}
            />

            <AdvisorDataToExcel
                dataToExcel={dataToExcel}

            />

            {popupData && <Popup data={popupData} onClose={closePopup} />}


            <SectionTitle>Add Advisor</SectionTitle>

            <AdvisorForm
                addAdvisor={addAdvisor}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default Advisor;
