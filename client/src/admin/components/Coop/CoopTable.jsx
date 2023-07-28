import React from 'react';
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
} from "@windmill/react-ui"; import { EditIcon, TrashIcon } from '../../icons';

function CoopTable({ setCoop,dataCoop,response, filteredCoop, advisors, handleDelete, openPopup }) {
    const resultsPerPage = 10;
    const totalResults = response.length;
    const handlePageChange = (p) => {
        setCoop(p);
    };

    return (
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
    );
}

export default CoopTable;
