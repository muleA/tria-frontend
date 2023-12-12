import { createSlice } from "@reduxjs/toolkit";

export interface EventState {
    allowedNodes: string[], 
    isValid: boolean
}

const initialState: EventState = {
    allowedNodes: [],
    isValid: true
}

const validationSlice = createSlice({
    name: "validation",
    initialState,
    reducers: {
        setAllowedNodes: (state: { allowedNodes: any; }, action: { payload: any; }) => {
            console.log("setAllowedNodes called")
            state.allowedNodes = action.payload;
          },
        resetIsValid: (state: { isValid: boolean; }, action: any) => {
            state.isValid = true
        },
        isValidConnection: (state: { allowedNodes: string | any[]; isValid: any; }, action: { payload: any; }) => {
            const connection = action.payload;
            const isValid = state.allowedNodes.includes(connection.target);
            state.isValid = isValid
        }
    }
})


export const { isValidConnection, resetIsValid, setAllowedNodes } = validationSlice.actions;

export default validationSlice.reducer

export const validationReducer = validationSlice.reducer