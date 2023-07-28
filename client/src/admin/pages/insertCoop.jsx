import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; // Import the Link component
import CTA from '../components/CTA';
import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import { Input, Label, Select, Textarea, Button } from '@windmill/react-ui';
import provinceData from '../components/utils/province.json'
import Swal from 'sweetalert2'
import CoopForm from "../components/Coop/CoopForm";
import CSVUploader from "../components/Coop/CoopCSVUploader"

function Forms() {
    const [advisors, setAdvisors] = useState([]);
    const [coopData, setCoopData] = useState({
        coop_id: '',
        student_id: '',
        major: '',
        company: '',
        student_name: '',
        province: '',
        advisor_id: '',
        semester: '',
        year: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCoopData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/cooperatives", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coopData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Coop saved successfully:", data);
                Swal.fire(
                    'Insert Successfully',
                    'Good job bro!',
                    'success'
                )
                // Redirect to "/app/tables"
                window.location.href = "/admin/coop";
            })
            .catch((error) => {
                console.error("Error saving report:", error);
                alert("Error: " + error.message);
            });
    };

    useEffect(() => {
        fetch("http://localhost:3000/advisors")
            .then((response) => response.json())
            .then((data) => {
                setAdvisors(data);
            })
            .catch((error) => {
                console.error("Error fetching advisors:", error);
            });
    }, []);

    return (
        <>
            <PageTitle>Forms</PageTitle>
            <SectionTitle>Add Coop Data</SectionTitle>

            <CoopForm
                coopData={coopData}
                advisors={advisors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

            <CSVUploader />
        </>
    )
}

export default Forms;
