import { createSlice } from "@reduxjs/toolkit";

export interface EventState {
    label: string,
}


const initialState: EventState = {
    label: "",
}

export const HandleColors:any = {
    ReviewApprove : "#00cc00",
    ReviewReject : "#f60909",
    ReviewAdjust : "#c7b705",
    ConfirmationYes : "#00cc00",
    ConfirmationNo : "#f60909",
    Yes: "#000000",
    default: "#000000"
}
  

export const handleSlice = createSlice({
    name: "handle",
    initialState,
    reducers: {
        addHandle: (state, action) => {
            state.label = action.payload
        }
    }
})

export const { addHandle } = handleSlice.actions

export const getHandleColor = (state: EventState) => HandleColors[state?.label] || '';

export const getHandleId = (state: EventState) => state?.label


export default handleSlice.reducer;

export const handleReducer = handleSlice.reducer