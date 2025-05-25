import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "@/types/store";
import {ReadingSession} from "@/types/ReadingSession";
import readingSessionApi from "@/api/endpoints/readingSessionApi";
import {Status} from "@/types";

export const saveSession = createAsyncThunk<
    ReadingSession,
    void,
    { state: RootState, rejectValue: string }
>(
    "sessionSlice/saveSession",
    async (_, {getState, rejectWithValue}) => {
        const progress = getState().test.currentTest?.progress

        if (!progress) {
            return rejectWithValue("Progress is missing");
        }

        const currentSession = getState().session.readingSession;

        const session = {
            ...currentSession,
            progress: progress,
            endTime: currentSession.endTime instanceof Date
                ? currentSession.endTime.toISOString()
                : currentSession.endTime,
            startTime: currentSession.startTime instanceof Date
                ? currentSession.startTime.toISOString()
                : currentSession.startTime,

        } as ReadingSession

        console.log("session", session)

        const response = await readingSessionApi.saveSession(session)
        console.log("response", response)
        if (!response.success) {
            return rejectWithValue(response.error.message);
        }
        return response.data;
    },
);

interface SessionState {
    readingSession: {
        startTime: Date | undefined;
        endTime: Date | undefined;
        startPage: number | undefined;
        endPage: number | undefined;
    }
    savingSessionInfo: {
        status: Status;
        error: string | null;
    };
}

const initialState: SessionState = {
    readingSession: {
        startTime: undefined,
        endTime: undefined,
        startPage: undefined,
        endPage: undefined,
    },
    savingSessionInfo: {
        status: Status.IDLE,
        error: null,
    },
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        reset: (state) => {
            state.readingSession.startTime = undefined;
            state.readingSession.endTime = undefined;
            state.readingSession.startPage = undefined;
            state.readingSession.endPage = undefined;
        },
        setStartTime: (state) => {
            console.log("setting start_time")
            state.readingSession.startTime = new Date();
            console.log("start_time", state.readingSession.startTime)
        },
        setEndTime: (state) => {
            state.readingSession.endTime = new Date();
        },
        setStartPage: (state, action: PayloadAction<number>) => {
            state.readingSession.startPage = action.payload;
        },
        setEndPage: (state, action: PayloadAction<number>) => {
            state.readingSession.endPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveSession.pending, (state) => {
                state.savingSessionInfo.status = Status.LOADING;
                state.savingSessionInfo.error = null;
            })
            .addCase(saveSession.fulfilled, (state) => {
                state.savingSessionInfo.status = Status.SUCCESS;
                state.savingSessionInfo.error = null;
            })
            .addCase(saveSession.rejected, (state, action) => {
                console.log("error", action.payload)
                state.savingSessionInfo.status = Status.ERROR
                state.savingSessionInfo.error = action.payload ?? "Unknown error";
            })
    },
});

export const {
    reset,
    setStartTime,
    setEndTime,
    setStartPage,
    setEndPage,
} = sessionSlice.actions;

export default sessionSlice;
