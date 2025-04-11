import apiRequest, {ApiResponse} from "@/api";
import {Access} from "@/types/Access";

const accessApi = {
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
};

export default accessApi;