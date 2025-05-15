import apiRequest, {ApiResponse} from "@/api";
import {GradeByParticipant} from "@/types/statistics/GradeByParticipant";

const statisticsApi = {
    getAvgGrade: async (): Promise<ApiResponse<GradeByParticipant[]>> => {
        return apiRequest<GradeByParticipant[]>({
            path: "/api/statistics/participants/avgGrade",
        });
    },
};

export default statisticsApi;