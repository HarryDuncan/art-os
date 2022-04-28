import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IDigitalArtState {}

// Define the initial state using that type
const initialState: IDigitalArtState = {};

export const digitalArtSlice = createSlice({
  name: "digitalArt",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = digitalArtSlice.actions;

export default digitalArtSlice.reducer;
