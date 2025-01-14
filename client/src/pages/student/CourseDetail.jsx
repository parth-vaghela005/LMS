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

      {/* Review Section */}
      <div className="review-section mt-8 p-6 bg-gray-50 rounded-xl shadow-md w-full lg:max-w-none mx-auto">
        <h2 className="font-bold text-2xl mb-4">User Reviews</h2>

        {/* Add Review Form */}
        <div className="add-review space-y-4 mb-6">
          <h3 className="font-semibold text-lg">Leave a Review</h3>
          <div className="stars flex gap-2 text-xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                data-value={star}
                onClick={() => setNewReview({ ...newReview, rating: star })}
                className={`cursor-pointer ${newReview.rating >= star ? "text-yellow-500" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            id="reviewText"
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            placeholder="Write your review here..."
            className="border p-3 rounded-md w-full lg:w-1/2 min-h-[120px] resize-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>

          {/* Buttons Design */}
          <div className="flex gap-4 mt-4 flex-col lg:flex-row lg:w-[35%] lg:gap-4">
            <Button
              onClick={handleReviewSubmit}
              className="w-full lg:w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white shadow-md transform transition-all duration-300"
            >
              Submit Review
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full lg:w-1/2 py-2.5 bg-gray-600 hover:bg-gray-700 rounded-lg text-white shadow-md transform transition-all duration-300"
                >
                  View All Reviews
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">All Reviews</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                      <img
                        src={review.profilePhoto}
                        alt={review.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col justify-start w-full">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-yellow-500 text-sm">
                            {"⭐".repeat(review.rating)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
