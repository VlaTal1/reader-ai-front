import React from "react";

import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";
import {StatisticsType} from "@/types/statistics";
import AvgGradeChart from "@/components/statistics/charts/AvgGradeChart";
import ReadingStatsPage from "@/components/statistics/charts/ReadingStatsPage";
import { ParticipantDailyStats} from "@/types/statistics/DailyStatistics";

const StatisticsChart = ({avgData, dailyData, type}: { avgData?: GradeByParticipant[], dailyData?: ParticipantDailyStats[], type: StatisticsType }) => {
    if (type === "avgGrade" && avgData) {
        return (
            <AvgGradeChart data={avgData}/>
        );
    }

    if (type === "daily" && dailyData) {
        return (
            <ReadingStatsPage data={dailyData}/>
        )
    }
}

export default StatisticsChart;