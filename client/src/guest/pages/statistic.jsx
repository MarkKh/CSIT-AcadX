import React , {useEffect} from "react";
import ReportBarGraph from '../../admin/utils/demo/reportBar'
import CoopChart from "../../admin/utils/demo/coopChart"

function Statistic() {
    useEffect(() => {
        document.title = 'AcadX | Statistic';
      }, []);
    
    return (
        <>
            <div className="container grid px-6 mx-auto">
                <div className="grid gap-6 mb-8">
                    <ReportBarGraph />
                    <CoopChart />
                </div>
            </div>

        </>
    )
}

export default Statistic;