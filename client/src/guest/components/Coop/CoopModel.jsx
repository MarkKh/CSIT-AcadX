import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
function ModalPage({ openModal, closeModal, coop }) {

    return (
        <>

            <Modal isOpen={openModal} onClose={closeModal}>
                <ModalHeader>Modal header</ModalHeader>
                <ModalBody>
                    <p>ID: {selectedCoopData.coop_id}</p>
                    <p>Student ID: {selectedCoopData.student_id}</p>
                                        <p>Student ID: {selectedCoopData.student_id}</p>

                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default ModalPage