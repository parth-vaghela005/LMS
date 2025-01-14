import React from "react";
import Course from "./Course";
import { useGetmycourseQuery } from "@/slices/api/AuthApi";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const { data, isLoading, isError } = useGetmycourseQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching courses. Please try again later.</div>;

  const enrolledCourses = data?.enrolledCourses || [];

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enrolledCourses.map((course) => (
              <Link key={course._id} to={`/course-progress/${course._id}`}>
                <Course course={course} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
