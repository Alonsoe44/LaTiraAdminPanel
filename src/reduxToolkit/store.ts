import { configureStore } from "@reduxjs/toolkit";
import paintingReducer from "./paintings/paintingsSlice";
import artCollectionsReducer from "./artCollections/artCollectionsSlice";

const store = configureStore({
  reducer: {
    paintings: paintingReducer,
    artCollections: artCollectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
