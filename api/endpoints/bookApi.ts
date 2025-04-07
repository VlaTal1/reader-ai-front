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
                "Content-Type": "multipart/form-data",
            },
        });
    },
    fetchBooks: async (): Promise<ApiResponse<Book[]>> => {
        return apiRequest<Book[]>({
            path: "/api/books",
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