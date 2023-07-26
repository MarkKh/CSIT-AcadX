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
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";
import Popup from "../components/Report/Popup";
import Swal from 'sweetalert2'

function Tables() {
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
        axios.get("http://localhost:3000/reports"),
        axios.get("http://localhost:3000/advisors"),
        axios.get("http://localhost:3000/reporttypes")
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
  });

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

  const YEAR_LIST = [2558 ,2561,2021, 2022, 2023, 2024]; // สามารถแก้ค่านี้ตามปีที่ต้องการให้แสดงในตัวเลือกฟิลเตอร์ได้

  // ตัวอย่างข้อมูลใน REPORT_TYPE_LIST
  const REPORT_TYPE_LIST = [
    { rep_type_id: 1, type_name: "Report Type A" },
    { rep_type_id: 2, type_name: "Report Type B" },
    { rep_type_id: 3, type_name: "Report Type C" },]

  const filterReports = (reportItem) => {
    const { advisor, year, rep_type, status } = selectedFilters;

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
      (year === "" || reportItem.year === year) &&
      (rep_type === "" || reportItem.rep_type_id === rep_type) &&
      (status === "" || reportItem.status === status)
    );
  };

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
        await axios.delete(`http://localhost:3000/report/${repCode}`);
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

  return (
    <>
      <PageTitle>Academic Reports</PageTitle>


      <SectionTitle>Table with actions</SectionTitle>
      <div className="flex justify-between mb-4">
        <div className="relative flex-1 mr-4">
          <Input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          </div>
        </div>
        <Button>
          <Link to="./report/insert">
            Add Data
          </Link>
        </Button>
      </div>

      <SectionTitle>Filter By</SectionTitle>
      <div className="flex justify-between mb-4">
        <div className="relative flex-1 mr-4">
          <label className="text-gray-700 dark:text-gray-200">Advisor:</label>
          <select
            value={selectedFilters.advisor}
            onChange={(e) => handleSelectFilter("advisor", e.target.value)}
            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="">Select Advisor</option>
            {Object.values(advisors).map((advisor, index) => (
              <option key={index} value={advisor}>
                {advisor}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 mr-4">
          <label className="text-gray-700 dark:text-gray-200">Year:</label>
          <select
            value={selectedFilters.year}
            onChange={(e) => handleSelectFilter("year", e.target.value)}
            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="">Select Year</option>
            {/* Replace 'YEAR_LIST' with an array containing available years */}
            {YEAR_LIST.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 mr-4">
          <label className="text-gray-700 dark:text-gray-200">Report Type:</label>
          <select
            value={selectedFilters.rep_type}
            onChange={(e) => handleSelectFilter("rep_type", e.target.value)}
            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="">Select Report Type</option>
            {/* Replace 'REPORT_TYPE_LIST' with an array containing available report types */}
            {REPORT_TYPE_LIST.map((reportType) => (
              <option key={reportType.rep_type_id} value={reportType.rep_type_id}>
                {reportType.type_name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 mr-4">
          <label className="text-gray-700 dark:text-gray-200">Status:</label>
          <select
            value={selectedFilters.status}
            onChange={(e) => handleSelectFilter("status", e.target.value)}
            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
            <option value="">Select Status</option>
            <option value="มีให้ยืม">มีให้ยืม</option>
            <option value="ถูกยืม">ถูกยืม</option>
            <option value="สูญหาย">สูญหาย</option>
            {/* Add more status options if needed */}
          </select>
        </div>
      </div>


      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell className="w-2/7">Report</TableCell>
              <TableCell className="w-1/7">1st Student</TableCell>
              <TableCell className="w-1/7">2nd Student</TableCell>
              <TableCell className="w-1/7">Status</TableCell>
              <TableCell className="w-1/7">Advisor</TableCell>
              <TableCell className="w-1/7">Actions</TableCell>
            </tr>
          </TableHeader>

          <TableBody>
            {dataReports
              .filter(() => {
                return (
                  { filterReports }
                );
              })
              .map((reportItem, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h1 className="font-semibold">
                            {reportItem.rep_code}
                          </h1>
                          {reportItem.prominence === "โดดเด่น" ? (
                            <Badge type="primary">โดดเด่น</Badge>
                          ) : null}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {reportItem.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">
                          {reportItem["1st_student_id"]}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {reportItem["1st_student_name"]}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        {reportItem["2nd_student_id"] === '-' ? (
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-5 px-4 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Not found</span>
                        ) : (
                          <p className="font-semibold">{reportItem["2nd_student_id"]}</p>
                        )}
                        {reportItem["2nd_student_name"] !== '-' && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {reportItem["2nd_student_name"]}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      type={
                        reportItem.status === "มีให้ยืม"
                          ? "success"
                          : reportItem.status === "ถูกยืม"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {reportItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {advisors[reportItem["1stAdvisor_id"]]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => openPopup(reportItem)}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => handleDelete(reportItem.rep_code)}
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
            onChange={onPageChangeReport}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>


      {popupData && <Popup data={popupData} onClose={closePopup} />}
    </>
  );
}

export default Tables;
