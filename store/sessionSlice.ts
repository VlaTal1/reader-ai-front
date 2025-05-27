import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "@/types/store";
import {ReadingSession} from "@/types/ReadingSession";
import readingSessionApi from "@/api/endpoints/readingSessionApi";
import {Status} from "@/types";
import {Progress} from "@/types/Progress";
import progressApi from "@/api/endpoints/progressApi";

export const saveSession = createAsyncThunk<
    ReadingSession,
    void,
    { state: RootState, rejectValue: string }
>(
    "sessionSlice/saveSession",
    async (_, {getState, rejectWithValue}) => {
        const progress = getState().session.progress.progress;

        if (!progress) {
            return rejectWithValue("Progress is missing");
        }

        const currentSession = getState().session.readingSession;

        const session = {
            ...currentSession,
            progress: progress,
            endTime: currentSession.endTime,
            startTime: currentSession.startTime,
        } as ReadingSession


        const response = await readingSessionApi.saveSession(session)
        if (!response.success) {
            return rejectWithValue(response.error.message);
        }
        return response.data;
    },
);

export const updateProgress = createAsyncThunk<
    Progress,
    void,
    { state: RootState, rejectValue: string }
>(
    "sessionSlice/updateProgress",
    async (_, {getState, rejectWithValue}) => {
        const progress = getState().session.progress.progress;

        if (!progress) {
            return rejectWithValue("Progress is missing");
        }

        const currentSession = getState().session;

        const progressToUpdate = {
            ...progress,
            currentPage: currentSession.readingSession.endPage,
            readPages: currentSession.progress.readPages,
        } as Progress

        const response = await progressApi.updateProgress(progressToUpdate)
        if (!response.success) {
            return rejectWithValue(response.error.message);
        }
        return response.data;
    },
);

interface SessionState {
    readingSession: {
        startTime: string | undefined;
        endTime: string | undefined;
        startPage: number | undefined;
        endPage: number | undefined;
    };
    progress: {
        progress: Progress | undefined;
        readPages: number | undefined;
    };
    savingSessionInfo: {
        status: Status;
        error: string | null;
    };
    savingProgressInfo: {
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
    progress: {
        progress: undefined,
        readPages: undefined,
    },
    savingSessionInfo: {
        status: Status.IDLE,
        error: null,
    },
    savingProgressInfo: {
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
            state.progress.readPages = undefined;
        },
        setStartTime: (state) => {
            state.readingSession.startTime = new Date().toISOString();
        },
        setEndTime: (state) => {
            state.readingSession.endTime = new Date().toISOString();
        },
        setStartPage: (state, action: PayloadAction<number>) => {
            state.readingSession.startPage = action.payload;
        },
        setEndPage: (state, action: PayloadAction<number>) => {
            state.readingSession.endPage = action.payload;
        },
        setProgress: (state, action: PayloadAction<Progress>) => {
            state.progress.progress = action.payload;
        },
        setReadPages: (state, action: PayloadAction<number>) => {
            state.progress.readPages = action.payload;
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
                state.savingSessionInfo.status = Status.ERROR
                state.savingSessionInfo.error = action.payload ?? "Unknown error";
            })
            .addCase(updateProgress.pending, (state) => {
                state.savingProgressInfo.status = Status.LOADING;
                state.savingProgressInfo.error = null;
            })
            .addCase(updateProgress.fulfilled, (state) => {
                state.savingProgressInfo.status = Status.SUCCESS;
                state.savingProgressInfo.error = null;
            })
            .addCase(updateProgress.rejected, (state, action) => {
                state.savingProgressInfo.status = Status.ERROR
                state.savingProgressInfo.error = action.payload ?? "Unknown error";
            })
    },
});

export const {
    reset,
    setStartTime,
    setEndTime,
    setStartPage,
    setEndPage,
    setProgress,
    setReadPages,
} = sessionSlice.actions;

export default sessionSlice;
