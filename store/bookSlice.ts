import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Book} from "@/types/Book";

interface BookState {
    testBook?: Book; // TODO move to testSlice
}

const initialState: BookState = {
    testBook: undefined,
};

const bookSlice = createSlice({
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

export const {setTestBook, resetTestBook} = bookSlice.actions;

export default bookSlice;
