import { createSlice } from "@reduxjs/toolkit";

export interface EventState {
    type: string,
    label: string,
  }

const initialState: EventState = {
    type: "",
    label: "",
}
  

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.type = action.payload.type
            state.label = action.payload.label
        } 
    }
})

export const { addEvent } = eventSlice.actions

export default eventSlice.reducer;

export const eventsReducer = eventSlice.reducer