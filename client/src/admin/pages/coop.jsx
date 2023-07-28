import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import Popup from "../components/Coop/CoopPopup";
import Swal from 'sweetalert2'
import CoopFilter from '../components/Coop/CoopFilter';
import CoopSearch from '../components/Coop/CoopSearch';
import CoopTable from '../components/Coop/CoopTable';

function Coop() {
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

      <CoopSearch search={search} setSearch={setSearch} />

      <CoopFilter
        response={response}
        advisors={advisors}
        selectedFilters={selectedFilters}
        handleSelectFilter={handleSelectFilter}
        clearFilters={clearFilters}
      />

      <CoopTable
        setCoop={setCoop}
        dataCoop={dataCoop}
        response={response}
        filteredCoop={filteredCoop}
        advisors={advisors}
        handleDelete={handleDelete}
        openPopup={openPopup}
      />


      {popupData && <Popup data={popupData} onClose={closePopup} />}

    </>
  );
}

export default Coop;
