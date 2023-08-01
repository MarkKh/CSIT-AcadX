import React from "react";
import { TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Badge, Button } from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";
import Swal from 'sweetalert2';
import axios from "axios";

function AdminTable({ response, handleDelete, openPopup }) {
    return (
        <TableContainer className="mb-8">

            <Table>
                <TableHeader>
                    <tr>
                        <TableCell className="w-1/5">ID</TableCell>
                        <TableCell className="w-1/5">Name</TableCell>
                        <TableCell className="w-1/5">Username</TableCell>
                        <TableCell className="w-1/5">Password</TableCell>
                        <TableCell className="w-1/5">Actions</TableCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {response.map((admin, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    {i + 1}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    {admin.name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    {admin.username}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    <Badge type="danger">Password is Secret</Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-4">
                                    <Button
                                        layout="link"
                                        size="icon"
                                        aria-label="Edit"
                                        onClick={() => openPopup(admin)}
                                    >
                                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(admin.admin_id)}
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
        </TableContainer>
    );
}

export default AdminTable;
