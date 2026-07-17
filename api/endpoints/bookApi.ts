import apiRequest, {ApiResponse} from "@/api";
import {Book} from "@/types/Book";

const bookApi = {
    uploadBook: async ({formData}: {
        formData: FormData;
    }): Promise<ApiResponse<Book>> => {
        return apiRequest<Book>({
            path: "/api/books",
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        });
    },
    fetchBooks: async (): Promise<ApiResponse<Book[]>> => {
        return apiRequest<Book[]>({
            path: "/api/books",
        });
    },
    fetchBooksByParticipantId: async (participantId: string): Promise<ApiResponse<Book[]>> => {
        return apiRequest<Book[]>({
            path: `/api/books/participant/${participantId}`,
        });
    },
    fetchBookById: async ({bookId}: {
        bookId: string;
    }): Promise<ApiResponse<Book>> => {
        return apiRequest<Book>({
            path: `/api/books/${bookId}`,
        });
    },
};

export default bookApi;