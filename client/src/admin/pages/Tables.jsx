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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDataReports(
      response
        .filter(filterReports)
        .slice((report - 1) * resultsPerPage, report * resultsPerPage)
    );
  }, [report, response, search]);

  const totalResults = response.length;

  const filterReports = (reportItem) => {
    return (
      search.toLowerCase() === "" ||
      reportItem.rep_code.toLowerCase().includes(search.toLowerCase()) ||
      reportItem.title.toLowerCase().includes(search.toLowerCase()) ||
      reportItem["1st_student_id"].toLowerCase().includes(search.toLowerCase()) ||
      reportItem["1st_student_name"].toLowerCase().includes(search.toLowerCase()) ||
      reportItem["2nd_student_id"].toLowerCase().includes(search.toLowerCase()) ||
      reportItem["2nd_student_name"].toLowerCase().includes(search.toLowerCase()) ||
      reportItem.status.toLowerCase().includes(search.toLowerCase()) ||
      advisors[reportItem["1stAdvisor_id"]].toLowerCase().includes(search.toLowerCase()) ||
      reportItem.prominence.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleDelete = async (repCode) => {
    const shouldDelete = window.confirm("Do you want to delete this report?");
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:3000/report/${repCode}`);
        fetchData();
        alert("Delete successful");
      } catch (error) {
        alert(error);
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