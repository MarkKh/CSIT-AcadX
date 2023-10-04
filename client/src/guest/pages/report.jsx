import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// component
import Popup from "../components/Report/ReportPopup";
import ReportTable from "../components/Report/ReportTable";
import ReportFilter from "../components/Report/ReportFilter";
import ReportSearch from "../components/Report/ReportSearch"
import ReportHero from '../components/Report/ReportHero'

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
        .sort((a, b) => {
          if (b.year !== a.year) {
            return b.year - a.year;
          }
          if (b.rep_type_id !== a.rep_type_id) {
            return a.rep_type_id === 1 ? -1 : 1;
          }
          return 0;
        })
        .slice((report - 1) * resultsPerPage, report * resultsPerPage)
    );
  }, [report, response, search, selectedFilters]);


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



  const openPopup = (data) => {
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
    fetchData();
  };

  useEffect(() => {
    document.title = 'AcadX | Report';
  }, []);

  return (
    <>

      <ReportHero />
      <div className="container grid px-6 mx-auto">

        {/* ReportSearch */}
        <ReportSearch setSearch={setSearch} dataToExcel={dataToExcel} />


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
          openPopup={openPopup}
          setReport={setReport}
        />


        {popupData && <Popup data={popupData} onClose={closePopup} />}
      </div>
    </>
  );
}

export default Reports;
