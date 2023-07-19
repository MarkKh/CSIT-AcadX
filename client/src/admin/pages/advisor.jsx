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
    Label
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";
import Popup from "../components/Advisor/Popup";


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
        const confirmDelete = window.confirm("Do you want to delete this coop?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/advisor/${advisor_id}`);
                fetchAdvisors();
                alert("Delete successful");
            } catch (error) {
                alert(error);
                console.error("Error: ", error);
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
                console.log("Coop saved successfully:", data);
                alert("Insert Successfully");
                // Redirect to "/app/tables"
                window.location.href = "/app/advisor";
            })
            .catch((error) => {
                console.error("Error saving report:", error);
                alert("Error: " + error.message);
            });
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
            <SectionTitle>Table with actions</SectionTitle>

            <div className="flex justify-between mb-4">
                    <Input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
                    />
            </div>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell className="w-1/5">ID</TableCell>
                            <TableCell className="w-3/5">Advisor</TableCell>
                            <TableCell className="w-1/5">Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataAdvisor.map((advisor, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Badge type="primary">{advisor.advisor_id}</Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        {advisor.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            layout="link"
                                            size="icon"
                                            aria-label="Edit"
                                            onClick={() => openPopup(advisor)}
                                        >
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(advisor.advisor_id)}
                                            layout="link"
                                            size="icon"
                                            aria-label="Delete"
                                        >
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </TableFooter>
            </TableContainer>

            {popupData && <Popup data={popupData} onClose={closePopup} />}


            <SectionTitle>Add Advisor</SectionTitle>

            <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                            <Input
                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter advisor name"
                                name="name"
                                value={addAdvisor.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>






        </>
    );
}

export default Advisor;
