import {Participant} from "@/types/Paticipant";
import {Book} from "@/types/Book";
import ReadingStatus from "@/types/ReadingStatus";

export type Progress = {
    id: number;
    participant: Participant;
    book: Book;
    readPages: number;
    currentPage: number;
    startDate: Date;
    endDate: Date;
    status: ReadingStatus;
}