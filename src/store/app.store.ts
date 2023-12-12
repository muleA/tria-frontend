import { configureStore } from '@reduxjs/toolkit';
import { edgesReducer, eventsReducer, handleReducer, nodesReducer, taskReducer, validationReducer } from '../components/back-office/work-flow';
import { GlobalErrorReducer } from '../shared/utilities/error-dialogue/error-slice';
import { apiSlice } from './app.api';
import { authReducer } from "./auth-slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    globalError: GlobalErrorReducer,
    task: taskReducer,
    event: eventsReducer,
    handle: handleReducer,
    validation: validationReducer,
    nodes: nodesReducer,
    edges: edgesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiSlice,
      },
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
