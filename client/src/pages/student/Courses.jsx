import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { useGetCreatorCourseQuery } from "@/slices/api/courseApi";
import axios from "axios";
import { Link } from "react-router-dom";

const Courses = () => {
  const [res,setres] = useState([]);
  // const { data, isLoading, isSuccess, refetch, error } = useGetCreatorCourseQuery();

  // useEffect(() => {
  //   if (!isSuccess) {
  //     refetch();
  //   }
  // }, [refetch, isSuccess]);
  async function fetchData() {
    try {
      var response = await axios.get('http://localhost:5000/api/v1/auth');
      console.log(response.data); 
      setres(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
console.log(res+ "parth");

  // if (error) {
  //   return <h1>Some error occurred while fetching courses.</h1>;
  // }

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
          
          )} */}
          {  res?.courses?.map((course, index) => (

<Link  to  ={`/course-detail/${course._id}`} >
              <Course key={index} course={course} />
            </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
