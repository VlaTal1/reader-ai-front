import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Book} from "@/types/Book";

interface BookState {
    testBook?: Book;
}

const initialState: BookState = {
    testBook: undefined,
};

const photoSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setTestBook: (state, action: PayloadAction<Book>) => {
            state.testBook = action.payload;
        },
        resetTestBook: (state) => {
            state.testBook = undefined;
        },
    },
});

export const {setTestBook, resetTestBook} = photoSlice.actions;

export default photoSlice;
