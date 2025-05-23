import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

import {AppDispatch, RootState} from "@/types/store";
import bookSlice from "@/store/bookSlice";
import testSlice from "@/store/testSlice";

const actionCreators = {
    ...bookSlice.actions,
    ...testSlice.actions,
};

export const store = configureStore({
    reducer: {
        book: bookSlice.reducer,
        test: testSlice.reducer,
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer({actionCreators})),
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
