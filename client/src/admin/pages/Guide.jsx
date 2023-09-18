import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import Guide_Doc from '../assets/pdf/ADMIN-Guide.pdf'

function AdminGuide() {
    return (
        <div>
            <PageTitle>Admin Guide</PageTitle>
            <center>
                <iframe src={Guide_Doc} title="Admin" width='100%' height='975px'></iframe>
            </center>
        </div>
    );
}

export default AdminGuide;
