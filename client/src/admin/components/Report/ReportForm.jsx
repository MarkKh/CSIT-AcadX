// ReportForm.js
import React from 'react';
import { Input, Label, Select, Textarea, Button } from '@windmill/react-ui';
import { Link } from 'react-router-dom'; // Import the Link component


const ReportForm = ({ reportData, advisors, handleInputChange, handleSubmit }) => {
    return (
        <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2 w-4/6 mx-auto">
                    <Label>
                        <span>Report Code</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Report Code"
                        name="rep_code"
                        value={reportData.rep_code}
                        onChange={handleInputChange}
                        required

                    />

                    <Label>
                        <span>Title</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Title"
                        name="title"
                        value={reportData.title}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Report Type</span>
                    </Label>
                    <div className="relative">
                        <Select
                            className="mt-2"
                            name="rep_type_id"
                            value={reportData.rep_type_id}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled defaultValue hidden>
                                Select Report Type
                            </option>
                            <option value="1">Undergraduate thesis report</option>
                            <option value="2">Cooperative report</option>
                        </Select>
                    </div>

                    <Label>
                        <span>1st Student ID</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="1st Student ID"
                        name="1st_student_id"
                        value={reportData["1st_student_id"]}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>1st Student Name</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="1st Student Name"
                        name="1st_student_name"
                        value={reportData["1st_student_name"]}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>2nd Student ID</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="2nd Student ID"
                        name="2nd_student_id"
                        value={reportData["2nd_student_id"]}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>2nd Student Name</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="2nd Student Name"
                        name="2nd_student_name"
                        value={reportData["2nd_student_name"]}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Year</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Year"
                        name="year"
                        value={reportData.year}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Advisor</span>
                    </Label>
                    <div className="relative">
                        <Select
                            className="mt-1"
                            name="1stAdvisor_id"
                            value={reportData["1stAdvisor_id"]}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled defaultValue hidden>
                                Select Advisor
                            </option>
                            {advisors.map((advisor) => (
                                <option key={advisor.advisor_id} value={advisor.advisor_id}>
                                    {advisor.name}
                                </option>
                            ))}
                        </Select>

                    </div>

                    <Label>
                        <span>โดดเด่น</span>
                    </Label>
                    <div className="relative">
                        <Select
                            className="mt-2"
                            name="prominence"
                            value={reportData.prominence}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled defaultValue hidden>
                                Select prominence
                            </option>
                            <option value="โดดเด่น">โดดเด่น</option>
                            <option value="-">-</option>
                        </Select>
                    </div>

                    <Label>
                        <span>Status</span>
                    </Label>
                    <div className="relative">
                        <Select
                            className="mt-2"
                            name="status"
                            value={reportData.status}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled defaultValue hidden>
                                Select Status
                            </option>
                            <option value="มีให้ยืม">มีให้ยืม</option>
                            <option value="ถูกยืม">ถูกยืม</option>
                            <option value="สูญหาย">สูญหาย</option>
                        </Select>

                    </div>

                    <Label>
                        <span>Keyword</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Keyword"
                        name="keyword"
                        value={reportData.keyword}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Abstract</span>
                    </Label>
                    <Textarea
                        className="mt-1"
                        rows="3"
                        placeholder="Abstract"
                        name="abstract"
                        value={reportData.abstract}
                        onChange={handleInputChange}
                        required>
                    </Textarea>
                </div>

                <br></br>
                <div class="flex justify-end space-x-2">
                    <Button type="button"><Link to="/admin/reports">
                        Cancel
                    </Link></Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
};

export default ReportForm;
