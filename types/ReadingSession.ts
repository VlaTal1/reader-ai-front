import {Progress} from "@/types/Progress";

export type ReadingSession = {
    id: number;
    progress: Progress;
    startTime: string;
    endTime: string;
    startPage: number;
    endPage: number;
    time: number;
}