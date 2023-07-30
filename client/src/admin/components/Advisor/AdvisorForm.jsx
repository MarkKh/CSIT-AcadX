// components/Advisor/AddAdvisorForm.js
import React, { useState } from "react";
import { Input, Button } from "@windmill/react-ui";
import Swal from "sweetalert2";

function AdvisorForm({ addAdvisor,handleInputChange,handleSubmit }) {
  return (
    <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 grid gap-3">
          <div className="flex items-center space-x-2">
            <Input
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter advisor name"
              name="name"
              value={addAdvisor.name}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdvisorForm;
