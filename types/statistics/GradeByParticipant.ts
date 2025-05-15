import {Participant} from "@/types/Paticipant";

export type GradeByParticipant = {
    participant: Participant;
    avgGrade: number;
    totalTests: number;
    completedTests: number;
}