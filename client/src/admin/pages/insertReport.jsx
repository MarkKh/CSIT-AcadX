import React, { useState, useEffect } from "react";
import CTA from '../components/CTA';
import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import Swal from 'sweetalert2'
import CSVUploader from "../components/Report/CSVUploader";
import ReportForm from "../components/Report/ReportForm";

function Forms() {

  const [advisors, setAdvisors] = useState([]);
  //const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [reportData, setReportData] = useState({
    rep_code: '',
    title: '',
    rep_type_id: '',
    "1st_student_id": '',
    "1st_student_name": '',
    "2nd_student_id": '',
    "2nd_student_name": '',
    year: '',
    "1stAdvisor_id": '',
    status: '',
    prominence: '',
    keyword: '',
    abstract: '',
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reportData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Report saved successfully:", data);
        Swal.fire(
          'Insert Successfully',
          'Good job bro!',
          'success'
        )
        // Redirect to "/app/tables"
        window.location.href = "/admin/Reports";
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
      <CTA />
      <SectionTitle>Add Report Data By row</SectionTitle>

      <ReportForm
          reportData={reportData}
          advisors={advisors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

      <CSVUploader />
    </>
  );
}

export default Forms;
