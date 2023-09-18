import { Card, CardBody } from '@windmill/react-ui';
import { HeartIcon } from "../../../admin/icons";
import { Button } from "@windmill/react-ui";
import Popup from '../Report/ReportPopup';
import Swal from 'sweetalert2';
import { getAllReport } from '../../../utils/routh'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ReportLike() {

    const [response, setResponse] = useState([]);
    const [likedReports, setLikedReports] = useState([]); // เพิ่ม state เพื่อเก็บข้อมูลที่อยู่ใน Local Storage
    const [popupData, setPopupData] = useState(null);


    useEffect(() => {
        fetchData();
        // โหลดข้อมูลที่อยู่ใน Local Storage และเก็บไว้ใน state
        const likedReportsFromLocalStorage = JSON.parse(localStorage.getItem('likedReports')) || [];
        setLikedReports(likedReportsFromLocalStorage);
    }, []);

    const fetchData = async () => {
        try {
            const [reportsResponse] = await Promise.all([
                axios.get(getAllReport),
            ]);

            setResponse(reportsResponse.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // สร้างฟังก์ชันสำหรับค้นหาข้อมูลใน response โดยใช้ rep_code
    const findReportByRepCode = (repCode) => {
        return response.find((report) => report.rep_code === repCode);
    };

    const openPopup = (data) => {
        setPopupData(data);
    };

    const closePopup = () => {
        setPopupData(null);
        fetchData();
    };

    function removeLikeFromLocalStorage(rep_id) {
        Swal.fire({
            title: 'Confirm Dislike',
            text: 'Are you sure you want to dislike this report?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, unlike it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const likedReports = JSON.parse(localStorage.getItem('likedReports')) || [];
                const updatedLikedReports = likedReports.filter(report => report !== rep_id);
                localStorage.setItem('likedReports', JSON.stringify(updatedLikedReports));
                Swal.fire(
                    'Disliked',
                    'The report has been disliked.',
                    'success'
                ).then(() => {
                    // Refresh the web page after unliking is complete
                    window.location.reload();
                });
            }
        });
    }

    return (
        <>
            <div className="container grid px-6 mx-auto">
                <h1 className='mb-4'>Report Liked</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {likedReports.length === 0 ? (
                        <h1 className="text-center text-red-600">ไม่พบข้อมูล</h1>
                    ) : (
                        
                        likedReports.map((repCode, index) => {
                            const report = findReportByRepCode(repCode);
                            if (report) {
                                return (
                                    <Card key={index} className="h-70">
                                        <div className="bg-pink-100 h-12 flex items-center justify-center">
                                            <Button
                                                layout="link"
                                                size="icon"
                                                aria-label="Like"
                                                onClick={() => removeLikeFromLocalStorage(report.rep_code)}
                                            >
                                                <HeartIcon
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    color='red'
                                                />
                                            </Button>
                                        </div>
                                        <CardBody className="flex flex-col justify-between h-full">
                                            <div>
                                                <p className="mb-1 font-semibold text-gray-600 dark:text-gray-300 text-center">{report.rep_code}</p>
                                                <p className="text-gray-600 dark:text-gray-400 text-center">{report.title}</p>
                                                <p
                                                    onClick={() => openPopup(report)}
                                                    className="text-center text-purple-600 dark:text-purple-900 cursor-pointer hover:text-purple-900 dark:hover:text-purple-300 transition-colors duration-200"
                                                >
                                                    ดูรายละเอียด
                                                </p>
                                            </div>


                                        </CardBody>
                                    </Card>
                                );
                            }
                            return null;
                        })
                    )}
                </div>

                <br></br>
                {popupData && <Popup data={popupData} onClose={closePopup} />}
            </div>

        </>
    )
}