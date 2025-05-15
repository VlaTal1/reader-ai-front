import {Participant} from "@/types/Paticipant";

export type DailyStatistics = {
    totalReadingTimeMinutes: number;
    totalPagesRead: number;
};

export type ParticipantDailyStats = {
    participant: Participant;
    dailyStats: Record<string, DailyStatistics>;
};