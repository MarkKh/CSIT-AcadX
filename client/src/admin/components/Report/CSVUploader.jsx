import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

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

    axios.post('http://localhost:3000/api/upload', formData)
      .then((response) => {
        console.log('Data uploaded successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data uploaded successfully',
        });
        fetchData();
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
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleCSVUpload}>Upload CSV</button>
    </div>
  );
}

export default CSVUploader;
