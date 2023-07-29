import React from 'react';
import { Input, Label, Select, Textarea, Button } from '@windmill/react-ui';
import { Link } from 'react-router-dom';
import provinceData from '../../components/utils/province.json'

const CoopForm = ({ coopData, advisors, handleInputChange, handleSubmit }) => {
    return (
        <div className="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2 w-4/6 mx-auto">

                    <Label>
                        <span>Company</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="company"
                        name="company"
                        value={coopData.company}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Province</span>
                    </Label>
                    <Select
                        className="mt-1"
                        name="province" // Update the name to provinceCode
                        value={coopData.province}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled defaultValue hidden>
                            Select Province
                        </option>
                        {provinceData.map((province) => (
                            <option key={province.provinceCode} value={province.provinceNameTh}>
                                {province.provinceNameTh} - {province.provinceNameEn}
                            </option>
                        ))}
                    </Select>

                    <Label>
                        <span>Student ID</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Student ID"
                        name="student_id"
                        value={coopData.student_id}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Student Name</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Student Name"
                        name="student_name"
                        value={coopData.student_name}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>
                        <span>Major</span>
                    </Label>
                    <Select
                        className="mt-1"
                        placeholder="Major"
                        name="major"
                        value={coopData.major}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled defaultValue hidden>
                            Select Major
                        </option>
                        <option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</option>
                        <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
                    </Select>


                    <Label>
                        <span>Advisor</span>
                    </Label>
                    <div className="relative">
                        <Select
                            className="mt-1"
                            name="advisor_id"
                            value={coopData.advisor_id}
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
                        <span>Semester</span>
                    </Label>
                    <Input
                        className="mt-1"
                        placeholder="Semester"
                        name="semester"
                        value={coopData.semester}
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
                        value={coopData.year}
                        onChange={handleInputChange}
                        required
                    />

                </div>

                <br></br>
                <div class="flex justify-end space-x-2">
                    <Button type="button"><Link to="/admin/coop">
                        Cancel
                    </Link></Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>)
}

export default CoopForm;
