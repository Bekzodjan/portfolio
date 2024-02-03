import { configureStore } from "@reduxjs/toolkit";
import slice from "./reducer";
import middleware from "./middleware";

const store = configureStore({
  reducer: slice.reducer,
  middleware: () => [middleware],
});
export default store;
