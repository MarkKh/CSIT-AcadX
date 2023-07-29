// components/Advisor/AdvisorTable.js
import React from "react";
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination } from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";

function AdvisorTable({ dataAdvisor, handlePageChange, currentPage, totalResults, handleDelete, openPopup }) {
  const resultsPerPage = 10;

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell className="w-1/5">ID</TableCell>
            <TableCell className="w-3/5">Advisor</TableCell>
            <TableCell className="w-1/5">Actions</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {dataAdvisor.map((advisor, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Badge type="primary">{advisor.advisor_id}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  {advisor.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button
                    layout="link"
                    size="icon"
                    aria-label="Edit"
                    onClick={() => openPopup(advisor)}
                  >
                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(advisor.advisor_id)}
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
          label="Table navigation"
          onChange={handlePageChange}
          currentPage={currentPage}
        />
      </TableFooter>
    </TableContainer>
  );
}

export default AdvisorTable;
