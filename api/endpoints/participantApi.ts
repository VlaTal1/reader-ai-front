import apiRequest, {ApiResponse} from "@/api";
import {Participant} from "@/types/Paticipant";

const participantApi = {
    saveParticipant: async ({participant}: {
        participant: Participant;
    }): Promise<ApiResponse<Participant>> => {
        return apiRequest<Participant>({
            path: "/api/participant",
            method: "POST",
            body: participant,
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
    fetchParticipantById: async (participantId: string): Promise<ApiResponse<Participant>> => {
        return apiRequest<Participant>({
            path: `/api/participant/${participantId}`,
        });
    },
};

export default participantApi;