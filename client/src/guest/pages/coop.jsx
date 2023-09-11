import React, { useState, useEffect } from "react";
import axios from "axios";

import CoopHero from '../components/Coop/CoopHero';
import CoopSearch from '../components/Coop/CoopSearch';
import CoopTable from '../components/Coop/CoopTable';
import CoopFilter from '../components/Coop/CoopFilter';

import { getAllCoop, getAllAdvisor, delCoop } from '../../utils/routh'

function Coop() {
    const [coop, setCoop] = useState([]);
    const [search, setSearch] = useState("");
    const [dataCoop, setDataCoop] = useState([]);
    const [response, setResponse] = useState([]);
    const [advisors, setAdvisors] = useState({});
    const resultsPerPage = 10;


    const fetchData = async () => {
        try {
            const [coopResponse, advisorsResponse] = await Promise.all([
                axios.get(getAllCoop),
                axios.get(getAllAdvisor),
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
        setCoop(1);
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
                .sort((a,b) => {
                    return b.year - a.year
                })
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


    const countData = response.filter(filteredCoop)



    return (
        <>
            <div className="container grid px-6 mx-auto">
                <CoopHero />
                <CoopSearch search={search} setSearch={setSearch} countData={countData} />


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

                />

            </div>
        </>
    );
}

export default Coop
