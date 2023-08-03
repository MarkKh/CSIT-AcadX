import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import SectionTitle from '../../components/Typography/SectionTitle';
import { Button, Input } from "@windmill/react-ui";
import { uploadReport } from '../../../utils/routh'

function CSVUploader({ fetchData }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCSVUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axios.post(uploadReport, formData)
      .then((response) => {
        console.log('Data uploaded successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data uploaded successfully',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/admin/Reports";
            fetchData();
          }
        })
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading data',
        });
      });
  };

  return (
    <div>
      <SectionTitle>Add Report Data By CSV</SectionTitle>

      <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex space-x-2">

          <Input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
          <Button onClick={handleCSVUpload}>Upload</Button>
        </div>

      </div>
    </div>
  );
}

export default CSVUploader;
