import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API = "http://localhost:5000/api/v1/auth/progress/course"; // Updated base URL

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  tagTypes: ["CourseProgress"], // ✅ Added tag for caching
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url:`/${courseId}`, // ✅ Updated URL structure
        method: "GET",
      }),
      providesTags: ["CourseProgress"], // ✅ Ensures caching works
    }),
    
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/progress/course/${courseId}/lecture/${lectureId}/view`, // ✅ Corrected path
        method: "POST",
      }),
      invalidatesTags: ["CourseProgress"], // ✅ Forces UI update
    }),

    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/progress/course/${courseId}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["CourseProgress"], // ✅ Forces re-fetch
    }),

    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/progress/course/${courseId}/incomplete`,
        method: "POST",
      }),
      invalidatesTags: ["CourseProgress"], // ✅ Forces re-fetch
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} = courseProgressApi;
