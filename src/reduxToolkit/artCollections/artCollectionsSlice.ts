/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import ArtCollectionStateInterface from "../../interfaces/ArtCollectionStateInterface";
import {
  createArtCollectionThunk,
  getArtCollectionsThunk,
  getArtCollectionThunk,
} from "./artCollecionThunks";

const initialState: ArtCollectionStateInterface = {
  artCollections: [],
  isLoading: false,
  artCollection: {
    author: "none",
    bannerImage: "none",
    title: "none",
    description: "none",
    smallDescription: "none",
    paintings: [],
  },
};
const artCollectionsSlice = createSlice({
  name: "ArtCollections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtCollectionsThunk.fulfilled, (state, action) => {
        state.artCollections = action.payload;
        state.isLoading = false;
      })
      .addCase(getArtCollectionsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtCollectionThunk.fulfilled, (state, action) => {
        state.artCollection = action.payload;
        state.isLoading = false;
      })
      .addCase(getArtCollectionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArtCollectionThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createArtCollectionThunk.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default artCollectionsSlice;
