import React, { useState, useEffect, useRef } from "react";
import { Input, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import Swal from 'sweetalert2'
import axios from "axios";
import { EditIcon, TrashIcon } from "../icons";
import Popup from '../components/Admin/AdminPopup';
import AdminTable from "../components/Admin/AdminTable";
import AdminForm from "../components/Admin/AdminForm";
import { GetAllAdminApi, delAdminApi, createAdminApi } from '../../utils/routh'

function Admin() {
    const [response, setResponse] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [dataAdmin, setDataAdmin] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(GetAllAdminApi);
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
                await axios.delete(`${delAdminApi}${adminID}`);
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

        fetch(createAdminApi, {
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

            <AdminTable response={response} handleDelete={handleDelete} openPopup={openPopup} />

            <SectionTitle className="mr-2">Add Admin</SectionTitle>

            <AdminForm
                handleSubmit={handleSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />

            {popupData && <Popup data={popupData} onClose={closePopup} />}


        </>
    )
}
export default Admin;
