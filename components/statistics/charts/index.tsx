import React from "react";

import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";
import {StatisticsType} from "@/types/statistics";
import AvgGradeChart from "@/components/statistics/charts/AvgGradeChart";

const StatisticsChart = ({data, type}: { data: GradeByParticipant[], type: StatisticsType }) => {
    if (type === "avgGrade") {
        return (
            <AvgGradeChart data={data}/>
        );
    }
}

export default StatisticsChart;