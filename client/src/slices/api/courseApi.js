import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = "http://localhost:5000/api/v1/auth"

export const courseApi = createApi({
  reducerPath: "courseApi",
//   tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/create",  
        method: "POST",
        body: { courseTitle, category },
      }),
    //   invalidatesTags: ["Refetch_Creator_Course"],  
    }),
    getCreatorCourse: builder.query({
        query: () => ({
          url: "/getcourse",
          method: "GET",
        }),
        // providesTags: ["Refetch_Creator_Course"],
      }),
      editCourse: builder.mutation({
        query: ({ formData, courseId }) => ({
          url: `/${courseId}`,
          method: "PUT",
          body: formData,
        }),
        invalidatesTags: ["Refetch_Creator_Course"],
      }),
      getCourseById: builder.query({
        query: (courseId) => ({
          url: `/getcourse/${courseId}`,
          method: "GET",
        }),
      }),
  }),
});
export const { useCreateCourseMutation ,
    useGetCreatorCourseQuery,
  useEditCourseMutation,useGetCourseByIdQuery } = courseApi;
