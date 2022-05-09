import { configureStore } from "@reduxjs/toolkit";
import paintingReducer from "./paintingsSlice";

const store = configureStore({
  reducer: {
    paintings: paintingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
