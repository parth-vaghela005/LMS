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
        // invalidatesTags: ["Refetch_Creator_Course"],
      }),
      getCourseById: builder.query({
        query: (courseId) => ({
          url: `/getcourse/${courseId}`,
          method: "GET",
        }),
      }),
      createLecture: builder.mutation({
        query: ({ lectureTitle, courseId }) => ({
          url: `/${courseId}/lecture`,
          method: "POST",
          body: { lectureTitle },
        }),
      }),
      // createReview: builder.mutation({
      //   query: ({ description, rating }) => ({
      //     url: `/${courseId}/review`,
      //     method: "POST",
      //     body: { lectureTitle },
      //   }),
      // }),
      getCourseLecture: builder.query({
        query: (courseId) => ({
          url: `/${courseId}/lecture`,
          method: "GET",
        }),
        providesTags: ["Refetch_Lecture"],
      }),
      editLecture: builder.mutation({
        query: ({
          lectureTitle,
          videoInfo,
          isPreviewFree,
          courseId,
          lectureId,
        }) => ({
          url: `/${courseId}/lecture/${lectureId}`,
          method: "POST",
          body: { lectureTitle, videoInfo, isPreviewFree },
        }),
      }),
      removeLecture: builder.mutation({
        query: (lectureId) => ({
          url: `/lecture/${lectureId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Refetch_Lecture"],
      }),
      getLectureById: builder.query({
        query: (lectureId) => ({
          url: `/lecture/${lectureId}`,
          method: "GET",
        }),
      }),
      publishCourse: builder.mutation({
        query: ({ courseId, query }) => ({
          url: `/${courseId}?publish=${query}`,
          method: "PATCH",
        }),
      }),
      getSearchCourse:builder.query({
        query: ({searchQuery, categories, sortByPrice}) => {
          // Build qiery string
          let queryString = `/search?query=${encodeURIComponent(searchQuery)}`
  
          // append cateogry 
          if(categories && categories.length > 0) {
            const categoriesString = categories.map(encodeURIComponent).join(",");
            queryString += `&categories=${categoriesString}`; 
          }
  
          // Append sortByPrice is available
          if(sortByPrice){
            queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
          }
  
          return {
            url:queryString,
            method:"GET", 
          }
        }
      }),
      getPublishedCourse: builder.query({
        query: () => ({
          url: "/published-courses",
          method: "GET",
        }),
      }),
      getCourseById: builder.query({
        query: (courseId) => ({
          url: `/getcourse/${courseId}`,
          method: "GET",
        }),
      }),
      createCheckoutSession: builder.mutation({
        query: (courseId) => ({
          url: "/create-checkout-session",
          method: "POST",
          body: { courseId },
        }),
      }),
   
  }),
});
export const { useCreateCourseMutation ,
    useGetCreatorCourseQuery,
  useEditCourseMutation,useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetSearchCourseQuery,
  useCreateCheckoutSessionMutation

 } = courseApi;
