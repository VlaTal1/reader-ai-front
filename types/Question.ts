import {Answer} from "@/types/Answer";

export type Question = {
    id: number;
    question: string;
    quote: string;
    answers: Answer[];
}