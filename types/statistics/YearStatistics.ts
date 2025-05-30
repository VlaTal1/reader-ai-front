import {Participant} from "@/types/Paticipant";

export type WeeklyReadingStats = {
    totalReadingTimeMinutes: number;
    totalPagesRead: number;
    averageRating: number;
}

export type WeeklyStatsByParticipant = {
    participant: Participant;
    weeklyStats: { [weekKey: string]: WeeklyReadingStats };
}