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
  }),
});
export const { useCreateCourseMutation ,
    useGetCreatorCourseQuery } = courseApi;
