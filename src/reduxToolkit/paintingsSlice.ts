/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import PaintingsStateInterface from "../interfaces/PaintingsStateInterface";
import { createPaintingThunk, getPaintingsThunk } from "./paintingsThunks";

const initialState: PaintingsStateInterface = {
  paintings: [],
  isLoading: false,
};

const paintingsSlice = createSlice({
  name: "Paintings",
  initialState,
  reducers: {
    updatePaintings(state, action) {
      return action.payload.paintings;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaintingsThunk.fulfilled, (state, action) => {
        state.paintings = action.payload;
        state.isLoading = false;
      })
      .addCase(getPaintingsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaintingThunk.fulfilled, (state: any) => {
        state.isLoading = false;
      })
      .addCase(createPaintingThunk.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { updatePaintings } = paintingsSlice.actions;
// I truly need some help to fix this any
export default (paintingsSlice as any).reducer;
