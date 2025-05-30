import apiRequest, {ApiResponse} from "@/api";
import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";
import {ParticipantDailyStats} from "@/types/statistics/DailyStatistics";
import {WeeklyStatsByParticipant} from "@/types/statistics/YearStatistics";

const statisticsApi = {
    getAvgGrade: async (): Promise<ApiResponse<GradeByParticipant[]>> => {
        return apiRequest<GradeByParticipant[]>({
            path: "/api/statistics/participants/avgGrade",
        });
    },
    getDaily: async (): Promise<ApiResponse<ParticipantDailyStats[]>> => {
        return apiRequest<ParticipantDailyStats[]>({
            path: "/api/statistics/participants/daily",
        });
    },
    getWeekly: async (): Promise<ApiResponse<WeeklyStatsByParticipant[]>> => {
        return apiRequest<WeeklyStatsByParticipant[]>({
            path: "/api/statistics/participants/weekly",
        });
    },
};

export default statisticsApi;