import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "../model/task";
const initialState: TaskState = {
    taskList: [
        {
            id: 1,
            label: "Submit service request for reg ...",
            type: "request",
        },
        {
            id: 2,
            label: "Invoice Confirmation - Payment ...",
            type: "confirmation",
        },
        {
            id: 3,
            label: "Invoice - Payment for registra ...",
            type: "request",
        },
        {
            id: 4,
            label: "Review compliance with service ...",
            type: "review",
        },
        {
            id: 5,
            label: "Cash Payment Receipt - Payment ...",
            type: "request",
        },
        {
            id: 6,
            label: "Payment - Payment for registra ...",
            type: "payment",
        },
        {
            id: 7,
            label: "e-Payment Receipt - Payment to ...",
            type: "request",
        },
        {
            id: 8,
            label: "Prepare Certificate for regist ...",
            type: "request",
        },
        {
            id: 9,
            label: "Notify Customer to co ...",
            type: "request",
        },
    ],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.taskList = state.taskList.concat(action.payload);
        },
    },
});

export const { addTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
