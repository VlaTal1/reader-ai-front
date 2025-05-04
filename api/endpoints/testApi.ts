import apiRequest, {ApiResponse} from "@/api";
import {Test} from "@/types/Test";

const testApi = {
    createTest: async (test: Test): Promise<ApiResponse<Test>> => {
        return apiRequest<Test>({
            path: "/api/test",
            method: "POST",
            body: test,
            headers: {
                "Accept": "application/json",
            },
        });
    },
    fetchTestsByParticipantId: async (participantId: string): Promise<ApiResponse<Test[]>> => {
        return apiRequest<Test[]>({
            path: `/api/test/participant/${participantId}`,
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
    },
    fetchTests: async (): Promise<ApiResponse<Test[]>> => {
        return apiRequest<Test[]>({
            path: "/api/test/",
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
    },
    fetchFirstTestByParticipantId: async (participantId: string): Promise<ApiResponse<Test>> => {
        return apiRequest<Test>({
            path: `/api/test/participant/${participantId}/firstTest`,
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
    },
    saveTest: async (test: Test): Promise<ApiResponse<Test>> => {
        return apiRequest<Test>({
            path: "/api/test/pass",
            method: "POST",
            body: test,
            headers: {
                "Accept": "application/json",
            },
        });
    },
};

export default testApi;