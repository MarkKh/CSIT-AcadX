import React, { useState } from "react";
import { Input, Button } from "@windmill/react-ui";
import Swal from 'sweetalert2';
import axios from "axios";

function AdminForm({ handleSubmit, formData, handleInputChange }) {

    return (
        <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={(event) => handleSubmit(event, formData)} className="flex items-center">
                <div className="flex-1 grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                        <Input
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Username"
                            name="username"
                            type="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={formData.password}
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

export default AdminForm;
