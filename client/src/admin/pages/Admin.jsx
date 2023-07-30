import React, { useState, useEffect, useRef } from "react";
import { Input, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import Swal from 'sweetalert2'
import axios from "axios";
import { EditIcon, TrashIcon } from "../icons";
import Popup from '../components/Admin/AdminPopup';

function Admin() {
    const [response, setResponse] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [dataAdmin, setDataAdmin] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admins");
            setResponse(response.data); // Update the response state with the actual data received from the API
            setDataAdmin(response.data); // Update the dataAdmin state with the actual data received from the API
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (adminID) => {
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
                await axios.delete(`http://localhost:3000/admin/${adminID}`);
                fetchData();
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


    const [formData, setFormData] = useState({ username: "", password: "", name: "" });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newAdmin = {
            username: formData.username,
            password: formData.password,
            name: formData.name,
        };

        fetch("http://localhost:3000/admins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAdmin)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Admin saved successfully:", data);
                return Swal.fire(
                    'Insert Successfully',
                    'Good job bro!',
                    'success'
                );
            })
            .then(() => {
                window.location.href = "/admin/Admin";
            })
            .catch((error) => {
                console.error("Error saving report:", error);
                alert("Error: " + error.message);
            });
    };


    const [popupData, setPopupData] = useState(null);

    const openPopup = (data) => {
        setPopupData(data);
    };

    const closePopup = () => {
        setPopupData(null);
        fetchData();
    };

    return (
        <>
            <PageTitle>Admin Management</PageTitle>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell className="w-1/5">ID</TableCell>
                            <TableCell className="w-1/5">Name</TableCell>
                            <TableCell className="w-1/5">Username</TableCell>
                            <TableCell className="w-1/5">Password</TableCell>
                            <TableCell className="w-1/5">Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {response.map((admin, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        {i + 1}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        {admin.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        {admin.username}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Badge type="danger">Password is Secret</Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            layout="link"
                                            size="icon"
                                            aria-label="Edit"
                                            onClick={() => openPopup(admin)}
                                        >
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(admin.admin_id)}
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
            </TableContainer>

            <SectionTitle className="mr-2">Add Admin</SectionTitle>

            <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <div className="flex-1 grid grid-cols-1 gap-3">
                        <div className="flex items-center space-x-2">
                            <Input
                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Username"
                                name="username"
                                type="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {popupData && <Popup data={popupData} onClose={closePopup} />}


        </>
    )
}
export default Admin;
