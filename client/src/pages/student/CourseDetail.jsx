import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const CourseDetail = () => {
  // Static data
  const course = {
    courseTitle: "JavaScript for Beginners",
    courseSubtitle: "Learn the fundamentals of JavaScript from scratch.",
    creator: { name: "John Doe" },
    createdAt: "2025-01-01T12:00:00Z",
    enrolledStudents: 120,
    description: `This course covers the basics of JavaScript, including variables, functions, loops, and more. Perfect for beginners!`,
    lectures: [
      { lectureTitle: "Introduction to JavaScript", videoUrl: "https://example.com/intro.mp4" },
      { lectureTitle: "Variables and Data Types", videoUrl: "https://example.com/variables.mp4" },
      { lectureTitle: "Functions and Scope", videoUrl: "https://example.com/functions.mp4" },
      { lectureTitle: "Loops and Iteration", videoUrl: "https://example.com/loops.mp4" },
    ],
    price: "₹999",
  };

  const handleContinueCourse = () => {
    console.log("Continue Course Clicked");
  };

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course.courseTitle}</h1>
          <p className="text-base md:text-lg">{course.courseSubtitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">{course.creator.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course.enrolledStudents}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p>{course.description}</p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {idx === 0 ? <PlayCircle size={14} /> : <Lock size={14} />}
                    {/* <PlayCircle size={14} /> */}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>{course.lectures[0].lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price: {course.price}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              <Button onClick={handleContinueCourse} className="w-full">
                Continue Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CourseDetail;
