import React from "react";
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination } from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../../icons";
import dayjs from 'dayjs';

function LoanData({ dataLoan, response, filterLoan, report, setLoan, handleDelete, handleReturn, openPopup }) {
    const totalResults = response.length;
    const resultsPerPage = 10;

    const onPageChangeLoan = (p) => {
        setLoan(p);
    };

    return (
        <>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell className="w-2/7">ID</TableCell>
                            <TableCell className="w-1/7">Report Information</TableCell>
                            <TableCell className="w-1/7">Borrower Information</TableCell>
                            <TableCell className="w-1/7">Start date</TableCell>
                            <TableCell className="w-1/7">End date</TableCell>
                            <TableCell className="w-1/7">Status</TableCell>
                            <TableCell className="w-1/7">Actions</TableCell>
                        </tr>
                    </TableHeader>

                    <TableBody>
                        {dataLoan
                            .filter(() => {
                                return (
                                    { filterLoan }
                                );
                            })
                            .map((loanItem, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            {loanItem.loan_id}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <h1 className="font-semibold">
                                                    {loanItem.rep_code}
                                                </h1>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {report[loanItem.rep_code]}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge
                                                        type={
                                                            loanItem.major === "Information Technology"
                                                                ? "primary"
                                                                : loanItem.major === "Computer Science"
                                                                    ? "warning"
                                                                    : "success"
                                                        }
                                                    >
                                                        {loanItem.major === "Information Technology"
                                                            ? "IT"
                                                            : loanItem.major === "Computer Science"
                                                                ? "CS"
                                                                : "etc"}
                                                    </Badge>
                                                    <h1 className="font-semibold">
                                                        {loanItem.borrower_name}
                                                    </h1>
                                                </div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    ID : {loanItem.borrower_id}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            {dayjs(loanItem.start_date).format('DD MMM YYYY')}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            {loanItem.end_date ? dayjs(loanItem.end_date).format('DD MMM YYYY') : 'ยังไม่คืน'}                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <Badge
                                                type={
                                                    loanItem.status === "Active" ? "warning" : "success"
                                                }
                                            >
                                                {loanItem.status}
                                            </Badge>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                layout="link"
                                                size="icon"
                                                aria-label="Loan"
                                                onClick={() => handleReturn(loanItem.loan_id, loanItem.status, loanItem.rep_code)}
                                            >
                                                <FormsIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                            <Button
                                                layout="link"
                                                size="icon"
                                                aria-label="Edit"
                                                onClick={() => openPopup(loanItem)}
                                            >
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                            <Button
                                                layout="link"
                                                size="icon"
                                                aria-label="Delete"
                                                onClick={() => handleDelete(loanItem.rep_code, loanItem.loan_id)}
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
                        onChange={onPageChangeLoan}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>

        </>
    );
}
export default LoanData;
