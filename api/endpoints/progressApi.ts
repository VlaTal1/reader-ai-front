import apiRequest, {ApiResponse} from "@/api";
import {Progress} from "@/types/Progress";

const progressApi = {
    fetchProgress: async ({participantId, bookId}: {
        participantId: string,
        bookId: string,
    }): Promise<ApiResponse<Progress>> => {
        return apiRequest<Progress>({
            path: `/api/progress/participant/${participantId}/book/${bookId}`,
        });
    },
    updateProgress: async (progress: Progress): Promise<ApiResponse<Progress>> => {
        return apiRequest<Progress>({
            path: "/api/progress/",
            method: "PUT",
            body: progress,
        });
    },
};

export default progressApi;