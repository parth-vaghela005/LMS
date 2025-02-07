import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetCourseByIdQuery } from "@/slices/api/courseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import ReviewComponent from "@/ReviewComponent";
// import ReviewComponent from "@/ReviewComponent";

const CourseDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      profilePhoto: "https://via.placeholder.com/150",
      rating: 5,
      text: "Great course! Highly recommend it.",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePhoto: "https://via.placeholder.com/150",
      rating: 4,
      text: "Very informative and well-structured.",
    },
  ]);

  const [newReview, setNewReview] = useState({ rating: 0, text: "" });

  const handleReviewSubmit = () => {
    const newReviewData = {
      id: reviews.length + 1,
      name: user.name || "Anonymous",
      profilePhoto: user.profilePhoto || "https://via.placeholder.com/150",
      rating: newReview.rating,
      text: newReview.text,
    };
    setReviews([newReviewData, ...reviews]);
    setNewReview({ rating: 0, text: "" });
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data || {};

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle || "Course Title"}</h1>
          <p className="text-base md:text-lg">{course?.subTitle || "Course Sub-title"}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name || "Unknown Creator"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated: {course?.updatedAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Course Details */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: course?.description || "" }} />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course?.lectures?.length || 0} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {lecture?.isPreviewFree ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture?.lectureTitle || "Untitled Lecture"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Video Player and Purchase Section */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures?.[0]?.videoUrl || ""}
                  controls={true}
                />
              </div>
              <h1>{course?.lectures?.[0]?.lectureTitle || "Lecture Title"}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹{course?.coursePrice?.toLocaleString("en-IN") || "Free"}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {course?.enrolledStudents.includes(user._id) ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white shadow-md transform transition-all duration-300"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

    <ReviewComponent  />
    {
  console.log(courseId)
}
    </div>
  );
};

export default CourseDetail;
