import { Card, CardBody } from '@windmill/react-ui';
import { HeartIcon } from "../../../admin/icons";
import { Button } from "@windmill/react-ui";
import Popup from '../Report/ReportPopup';
import Swal from 'sweetalert2';
import { getAllCoop } from '../../../utils/routh'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ReportLike() {

    const [response, setResponse] = useState([]);
    const [likedCoop, setLikedCoop] = useState([]); // เพิ่ม state เพื่อเก็บข้อมูลที่อยู่ใน Local Storage
    const [popupData, setPopupData] = useState(null);


    useEffect(() => {
        fetchData();
        // โหลดข้อมูลที่อยู่ใน Local Storage และเก็บไว้ใน state
        const likedCoopFromLocalStorage = JSON.parse(localStorage.getItem('likedCoop')) || [];
        setLikedCoop(likedCoopFromLocalStorage);
    }, []);

    const fetchData = async () => {
        try {
            const [reportsResponse] = await Promise.all([
                axios.get(getAllCoop),
            ]);

            setResponse(reportsResponse.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // สร้างฟังก์ชันสำหรับค้นหาข้อมูลใน response โดยใช้ rep_code
    const findCoopByRepCode = (coopID) => {
        return response.find((coop) => coop.coop_id === coopID);
    };



    function removeLikeFromLocalStorage(rep_id) {
        Swal.fire({
            title: 'Confirm Dislike',
            text: 'Are you sure you want to dislike this coop?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, dislike it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const likedCoop = JSON.parse(localStorage.getItem('likedCoop')) || [];
                const updatedLikedCoop = likedCoop.filter(report => report !== rep_id);
                localStorage.setItem('likedCoop', JSON.stringify(updatedLikedCoop));
                Swal.fire(
                    'Disliked',
                    'The coop has been disliked.',
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
                <h1 className='mb-4'>Coop Liked</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {likedCoop.length === 0 ? (
                        <h1 className="text-center text-red-600">ไม่พบข้อมูล</h1>
                    ) : (
                        likedCoop.map((coopID, index) => {
                            const coop = findCoopByRepCode(coopID);
                            if (coop) {
                                return (
                                    <Card key={index} className="h-70">
                                        <div className="bg-blue-100 h-12 flex items-center justify-center">
                                            <Button
                                                layout="link"
                                                size="icon"
                                                aria-label="Like"
                                                onClick={() => removeLikeFromLocalStorage(coop.coop_id)}
                                            >
                                                <HeartIcon
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    color='blue'
                                                />
                                            </Button>
                                        </div>
                                        <CardBody className="flex flex-col justify-between h-full">
                                            <div>
                                                <p className="mb-1 font-semibold text-gray-600 dark:text-gray-300 text-center">{coop.company}</p>
                                                <p className="text-gray-600 dark:text-gray-400 text-center">จังหวัด {coop.province}</p>

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
            </div>

        </>
    )
}