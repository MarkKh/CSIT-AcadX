import React from "react";
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination } from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../../../admin/icons";

function ReportTable({ dataReports, response, filterReports, advisors, openPopup, setReport }) {
  const totalResults = response.length;
  const resultsPerPage = 10;

  const onPageChangeReport = (p) => {
    setReport(p);
  };

  return (
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
                      <FormsIcon className="w-5 h-5" aria-hidden="true" />
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
  );
}

export default ReportTable;
