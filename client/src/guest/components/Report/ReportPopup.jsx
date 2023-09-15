import React from "react";
import axios from "axios";
import { Button, Table } from "@windmill/react-ui";
import "../../../admin/utils/css/Popup.css";
import { getAllAdvisor, getRepType } from '../../../utils/routh'

function Popup({ data, onClose }) {
  const [advisors, setAdvisors] = React.useState({});
  const [reportType, setReportType] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [advisorsResponse, reportTypesResponse] = await Promise.all([
          axios.get(getAllAdvisor),
          axios.get(getRepType)
        ]);

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

    fetchData();
  }, []);

  const fieldDisplayNames = {
    rep_code: "Report Code",
    title: "Title",
    rep_type_id: "Report Type",
    "1st_student_id": "1st Student ID",
    "1st_student_name": "1st Student Name",
    "2nd_student_id": "2nd Student ID",
    "2nd_student_name": "2nd Student Name",
    years: "Years",
    "1stAdvisor_id": "Advisor",
    status: "Status",
    prominence: "Prominence",
    keyword: "Keyword",
    abstract: "Abstract",
  };

  const statusOptions = [
    { value: "มีให้ยืม", label: "มีให้ยืม" },
    { value: "ถูกยืม", label: "ถูกยืม" },
    { value: "สูญหาย", label: "สูญหาย" },
  ];

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg overflow-y-auto popup">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Information</h2>
          <button
            onClick={onClose}
            className="text-purple-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="text-sm">
          <Table>
            <tbody>
              {Object.entries(data).map(([field, value]) => {
                const fieldName = fieldDisplayNames[field] || field;

                if (field === "rep_type_id" && reportType[value]) {
                  const currentRepType = reportType[value];

                  return (
                    <tr key={field}>
                      <td className="pr-4 font-semibold">{fieldName}</td>
                      <td>{currentRepType}</td>
                    </tr>
                  );
                }

                if (field === "1stAdvisor_id" && advisors[value]) {
                  const currentAdvisorName = advisors[value];

                  return (
                    <tr key={field}>
                      <td className="pr-4 font-semibold">{fieldName}</td>
                      <td>{currentAdvisorName}</td>
                    </tr>
                  );
                }

                if (field === "status") {
                  const currentStatusOption = statusOptions.find((option) => option.value === value);

                  return (
                    <tr key={field}>
                      <td className="pr-4 font-semibold">{fieldName}</td>
                      <td>{currentStatusOption ? currentStatusOption.label : value}</td>
                    </tr>
                  );
                }

                if (field === "abstract") {
                  return (
                    <tr key={field}>
                      <td className="pr-4 font-semibold">{fieldName}</td>
                      <td style={{ whiteSpace: "pre-line" }}>{value}</td>
                    </tr>
                  );
                }

                return (
                  <tr key={field}>
                    <td className="pr-4 font-semibold">{fieldName}</td>
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} size="small" className="mr-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
