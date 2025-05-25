import apiRequest, {ApiResponse} from "@/api";
import {ReadingSession} from "@/types/ReadingSession";

const readingSessionApi = {
    saveSession: async (readingSession: ReadingSession): Promise<ApiResponse<ReadingSession>> => {
        return apiRequest<ReadingSession>({
            path: "/api/readingSession",
            method: "POST",
            body: readingSession,
        });
    },
};

export default readingSessionApi;