import apiRequest, {ApiResponse} from "@/api";
import {Participant} from "@/types/Paticipant";
import {Access} from "@/types/Access";

const participantApi = {
    grantAccess: async ({bookId, participantId}: {
        bookId: string;
        participantId: string;
    }): Promise<ApiResponse<Access>> => {
        return apiRequest<Access>({
            path: `/api/access/grant/book/${bookId}/participant/${participantId}`,
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
        });
    },
    fetchAllParticipants: async (): Promise<ApiResponse<Participant[]>> => {
        return apiRequest<Participant[]>({
            path: "/api/participant/all",
        });
    },
};

export default participantApi;