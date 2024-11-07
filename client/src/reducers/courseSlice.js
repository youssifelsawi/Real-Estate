import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses, fetchCourseById } from "../APIs/coursesApis";

// Fetch courses from the API

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
    selectedCourse: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'loading';
        state.selectedCourse = null; // Clear previous course when loading new one
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCourse = action.payload; // Store the fetched course
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;

