import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Test} from "@/types/Test";
import {RootState} from "@/types/store";
import testApi from "@/api/endpoints/testApi";
import {Status} from "@/types";

export const savePassedTest = createAsyncThunk<
    Test,
    void,
    { state: RootState, rejectValue: string }
>(
    "testSlice/savePassedTest",
    async (_, {getState, rejectWithValue}) => {
        const test = getState().test.currentTest;

        if (!test) {
            return rejectWithValue("No test to save");
        }

        const response = await testApi.saveTest(test)
        if (!response.success) {
            return rejectWithValue(response.error.message);
        }
        return response.data;
    },
);

interface TestState {
    currentTest?: Test;
    savingTestInfo: {
        status: Status;
        error: string | null;
    };
}

const initialState: TestState = {
    currentTest: undefined,
    savingTestInfo: {
        status: Status.IDLE,
        error: null,
    },
};

const testSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setCurrentTest: (state, action: PayloadAction<Test>) => {
            state.currentTest = action.payload;
        },
        resetCurrentTest: (state) => {
            state.currentTest = undefined;
        },
        selectAnswer: (state, action: PayloadAction<{ questionIndex: number, selectedAnswerId: number }>) => {
            const {questionIndex, selectedAnswerId} = action.payload;
            if (!state.currentTest) {
                return;
            }
            state.currentTest.questions[questionIndex].answers.map((answer) => {
                answer.selected = answer.id === selectedAnswerId;
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePassedTest.pending, (state) => {
                state.savingTestInfo.status = Status.LOADING;
                state.savingTestInfo.error = null;
            })
            .addCase(savePassedTest.fulfilled, (state, action) => {
                state.savingTestInfo.status = Status.SUCCESS;
                state.savingTestInfo.error = null;
                state.currentTest = action.payload;
            })
            .addCase(savePassedTest.rejected, (state, action) => {
                state.savingTestInfo.status = Status.ERROR
                state.savingTestInfo.error = action.payload ?? "Unknown error";
            })
    },
});

export const {setCurrentTest, resetCurrentTest, selectAnswer} = testSlice.actions;

export default testSlice;
