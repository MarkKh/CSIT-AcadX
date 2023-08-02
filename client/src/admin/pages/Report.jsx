import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Badge
} from "@windmill/react-ui";
import Swal from 'sweetalert2'
// component
import Popup from "../components/Report/ReportPopup";
import ReportLoan from "../components/Report/ReportLoan"
import ReportTable from "../components/Report/ReportTable";
import ReportFilter from "../components/Report/ReportFilter";
import ReportSearch from "../components/Report/ReportSearch"
import ReportExcel from "../components/Report/ReportDataToExcel";

import { getAllReport, getAllAdvisor, getRepType, delReport } from '../../utils/routh'

function Reports() {
  const [report, setReport] = useState(1);
  const [dataReports, setDataReports] = useState([]);
  const resultsPerPage = 10;
  const [response, setResponse] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [search, setSearch] = useState("");
  const [advisors, setAdvisors] = useState({});
  const [reportType, setReportType] = useState({});

  const fetchData = async () => {
    try {
      const [reportsResponse, advisorsResponse, reportTypesResponse] = await Promise.all([
        axios.get(getAllReport),
        axios.get(getAllAdvisor),
        axios.get(getRepType)
      ]);

      setResponse(reportsResponse.data);

      const advisorsMap = {};
      advisorsResponse.data.forEach((advisor) => {
        advisorsMap[advisor.advisor_id] = advisor.name;
      });
      setAdvisors(advisorsMap);

      const reportTypeMap = {};
      reportTypesResponse.data.forEach((report_type) => {
        reportTypeMap[report_type.rep_type_id] = report_type.type_name;
      });
      setReportType(reportTypeMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState({
    advisor: "",
    year: "",
    rep_type: "",
    status: "",
    prominence: ""
  });

  const clearFilters = () => {
    setSelectedFilters({
      advisor: "",
      year: "",
      rep_type: "",
      status: "",
      prominence: ""
    });
  };


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    setDataReports(
      response
        .filter(filterReports)
        .slice((report - 1) * resultsPerPage, report * resultsPerPage)
    );
  }, [report, response, search, selectedFilters]);

  const totalResults = response.length;

  const handleSelectFilter = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };



  const filterReports = (reportItem) => {
    const { advisor, year, rep_type, status, prominence } = selectedFilters;

    return (
      (search.toLowerCase() === "" ||
        reportItem.rep_code.toLowerCase().includes(search.toLowerCase()) ||
        reportItem.title.toLowerCase().includes(search.toLowerCase()) ||
        reportItem["1st_student_id"].toLowerCase().includes(search.toLowerCase()) ||
        reportItem["1st_student_name"].toLowerCase().includes(search.toLowerCase()) ||
        reportItem["2nd_student_id"].toLowerCase().includes(search.toLowerCase()) ||
        reportItem["2nd_student_name"].toLowerCase().includes(search.toLowerCase()) ||
        reportItem.status.toLowerCase().includes(search.toLowerCase()) ||
        advisors[reportItem["1stAdvisor_id"]].toLowerCase().includes(search.toLowerCase()) ||
        reportItem.prominence.toLowerCase().includes(search.toLowerCase())) &&
      (advisor === "" || advisors[reportItem["1stAdvisor_id"]] === advisor) &&
      (year === "" || reportItem.year === Number(year)) &&
      (rep_type === "" || reportItem.rep_type_id === Number(rep_type)) &&
      (status === "" || reportItem.status === status) &&
      (prominence === "" || reportItem.prominence === prominence)
    );
  };

  const dataToExcel = response.filter(filterReports)

  const handleDelete = async (repCode) => {
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
        await axios.delete(`${delReport}${repCode}`);
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


  const onPageChangeReport = (p) => {
    setReport(p);
  };

  const openPopup = (data) => {
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
    fetchData();
  };

  const [loanPopupData, setLoanPopupData] = useState(null);

  const openLoan = (data) => {
    setLoanPopupData(data);
  }
  const closeLoan = () => {
    setLoanPopupData(null);
    fetchData();
  }

  return (
    <>
      <PageTitle>Academic Reports</PageTitle>

      {/* CSVUploader */}
      {/* <CSVUploader fetchData={fetchData} /> */}

      {/* ReportSearch */}
      <ReportSearch setSearch={setSearch} />

      <div className="flex items-center justify-between">
        <SectionTitle className="mr-2">Filter By</SectionTitle>
        <div className="flex py-4 justify-end">
          <Badge type="primary">   Found {dataToExcel.length} item   </Badge>
        </div>
      </div>

      {/* ReportFilter */}
      <ReportFilter
        selectedFilters={selectedFilters}
        advisors={advisors}
        response={response}
        handleSelectFilter={handleSelectFilter}
        clearFilters={clearFilters}
      />

      {/* ReportTable */}
      <ReportTable
        dataReports={dataReports}
        response={response}
        filterReports={filterReports}
        advisors={advisors}
        handleDelete={handleDelete}
        openPopup={openPopup}
        setReport={setReport}
        openLoan={openLoan}
      />

      {/* ReportExcel */}
      <ReportExcel
        dataToExcel={dataToExcel}
      />


      {popupData && <Popup data={popupData} onClose={closePopup} />}
      {loanPopupData && <ReportLoan data={loanPopupData} onClose={closeLoan} />}
    </>
  );
}

export default Reports;
