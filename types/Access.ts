import {Participant} from "@/types/Paticipant";
import {Book} from "@/types/Book";

export type Access = {
    id: number;
    participant: Participant;
    book: Book;
}