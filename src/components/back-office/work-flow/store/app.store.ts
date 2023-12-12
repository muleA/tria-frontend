import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app.api';
import {taskReducer} from './tasks.slice'
import eventReducer from "./events.slice"
import handleReducer from "./handle.slice"
import validationReducer from './validation.slice'
import nodesReducer from './nodes.slice'
import edgesReducer from "./edges.slice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    task: taskReducer,
    event: eventReducer,
    handle: handleReducer,
    validation: validationReducer,
    nodes: nodesReducer,
    edges: edgesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;