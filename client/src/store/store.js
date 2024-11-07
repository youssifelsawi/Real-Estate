import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../reducers/courseSlice";
export default configureStore({
  reducer: {
    courses: courseSlice,
  },
});
