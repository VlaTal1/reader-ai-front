import {Access} from "@/types/Access";

export type Book = {
    id: number;
    title: string;
    author: string;
    fileName: string;
    originalFileName: string;
    fileSize: number;
    fileType: string;
    accesses: Access[]
}