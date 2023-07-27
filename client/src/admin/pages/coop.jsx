import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
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
  Select
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";
import Popup from "../components/Coop/Popup";
import Swal from 'sweetalert2'
import provinceData from '../components/utils/province.json'

function Tables() {
  const [coop, setCoop] = useState([]);
  const [dataCoop, setDataCoop] = useState([]);
  const [response, setResponse] = useState([]);
  const [search, setSearch] = useState("");
  const resultsPerPage = 10;
  const [advisors, setAdvisors] = useState({});
  const [popupData, setPopupData] = useState(null);


  const fetchData = async () => {
    try {
      const [coopResponse, advisorsResponse] = await Promise.all([
        axios.get("http://localhost:3000/cooperatives"),
        axios.get("http://localhost:3000/advisors"),
      ])

      setResponse(coopResponse.data);

      const advisorsMap = {};
      advisorsResponse.data.forEach((advisor) => {
        advisorsMap[advisor.advisor_id] = advisor.name;
      });
      setAdvisors(advisorsMap);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (coopId) => {
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
        await axios.delete(`http://localhost:3000/cooperative/${coopId}`);
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


  const [selectedFilters, setSelectedFilters] = useState({
    major: "",
    province: "",
    advisor_id: "",
    semester: "",
    year: ""
  });

  const clearFilters = () => {
    setSelectedFilters({
      major: "",
      province: "",
      advisor_id: "",
      semester: "",
      year: ""
    });
  };

  const handleSelectFilter = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    setDataCoop(
      response
        .filter(filteredCoop)
        .slice((coop - 1) * resultsPerPage, coop * resultsPerPage)
    );
  }, [coop, response, search, selectedFilters]);

  const filteredCoop = (coop) => {
    const { major, province, advisor_id, semester, year } = selectedFilters;
    return (
      (search.toLowerCase() === "" ||
        coop.student_id.toLowerCase().includes(search.toLowerCase()) ||
        coop.major.toLowerCase().includes(search.toLowerCase()) ||
        coop.company.toLowerCase().includes(search.toLowerCase()) ||
        coop.student_name.toLowerCase().includes(search.toLowerCase()) ||
        coop.province.toLowerCase().includes(search.toLowerCase()) ||
        advisors[coop.advisor_id].toLowerCase().includes(search.toLowerCase()) ||
        coop.semester.toString().includes(search) ||
        coop.year.toString().includes(search) ||
        coop.coop_id.toString().includes(search)) &&
      (major === "" || coop.major === major) &&
      (province === "" || coop.province === province) &&
      (advisor_id === "" || advisors[coop.advisor_id] === advisor_id) &&
      (semester === "" || coop.semester === Number(semester)) &&
      (year === "" || coop.year === Number(year))
    );
  };

  const handlePageChange = (p) => {
    setCoop(p);
  };

  const openPopup = (data) => {
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
    fetchData();
  };


  const totalResults = response.length;

  return (
    <>
      <PageTitle>Cooperatives</PageTitle>

      <SectionTitle>Table with actions</SectionTitle>

      <div className="flex justify-between mb-4">
        <div className="relative flex-1 mr-4">
          <Input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
          />
        </div>
        <Button>
          <Link to="./coop/insert">Add Data</Link>
        </Button>
      </div>

      <div className="flex justify-between mb-5">
        <div className="flex flex-wrap space-x-2 items-center">

          <div className="relative flex-1">
            <Select
              value={selectedFilters.advisor_id}
              onChange={(e) => handleSelectFilter("advisor_id", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Select Advisor</option>
              {Object.values(advisors).map((advisor, index) => (
                <option key={index} value={advisor}>
                  {advisor}
                </option>
              ))}
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.semester}
              onChange={(e) => handleSelectFilter("semester", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.year}
              onChange={(e) => handleSelectFilter("year", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Select Year</option>
              {Array.from(new Set(response.map((coop) => coop.year))).map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.major}
              onChange={(e) => handleSelectFilter("major", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Select Major</option>
              <option value="วิทยาการคอมพิวเตอร์">Computer Science</option>
              <option value="เทคโนโลยีสารสนเทศ">Information Technology</option>
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.province}
              onChange={(e) => handleSelectFilter("province", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Select Province</option>
              {response
                .map((coop) => coop.province)
                .filter((value, index, self) => self.indexOf(value) === index)
                .sort()
                .map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
            </Select>
          </div>



        </div>

        <Button layout="link" onClick={clearFilters} className="flex items-center">
          <span>Clear</span>
        </Button>

      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell className="w-1/8">ID</TableCell>
              <TableCell className="w-1/8">Student Information</TableCell>
              <TableCell className="w-1/8">Company</TableCell>
              <TableCell className="w-1/8">Advisor ID</TableCell>
              <TableCell className="w-1/8">Semester</TableCell>
              <TableCell className="w-1/8">Year</TableCell>
              <TableCell className="w-1/8">Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataCoop
              .filter(() => {
                return (
                  { filteredCoop }
                );
              }).map((coop, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {coop.coop_id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            type={
                              coop.major === "วิทยาการคอมพิวเตอร์" ? "warning" : "primary"
                            }
                          >
                            {coop.major === "วิทยาการคอมพิวเตอร์" ? "CS" : "IT"}
                          </Badge>
                          <h1 className="font-semibold">
                            {coop.student_id}
                          </h1>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {coop.student_name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h1 className="font-semibold">
                            {coop.company}
                          </h1>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span>จังหวัด </span>
                          <Badge type="success">{coop.province}</Badge>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {advisors[coop.advisor_id]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {coop.semester}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {coop.year}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => openPopup(coop)}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(coop.coop_id)}
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
            onChange={handlePageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {popupData && <Popup data={popupData} onClose={closePopup} />}

    </>
  );
}

export default Tables;
