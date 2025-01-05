import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft ,PlusCircle} from "lucide-react";
// import { ExclamationCircle } from 'lucide-react';
import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/slices/api/courseApi";
// import {
//   useCreateLectureMutation,
//   useGetCourseLectureQuery,
// } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";
// import Lecture from "./Lecture";

const CreateLecture = () => {
  const navigate  = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  // const courseId  = useParams.courseId;
  const goToUpdateLecture = () => {
    // navigate(`${lecture._id}`);
    navigate(`create`);
  };
  const [lectureTitle, setLectureTitle] = useState("");

  // const navigate = useNavigate();
//   const isLoading = false;
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } =useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
     
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
        Add some key details for your new lecture to get started.
        </p>
      </div>
      <div className="space-y-4">
        {/* <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div> */}
        <div className="flex items-center gap-2">
        <Button
  variant="outline"
  className="flex items-center space-x-2 border-gray-500 text-gray-700 hover:bg-gray-50"
  onClick={() => navigate(`/admin/course/${courseId}`)}
>
  <ArrowLeft className="h-5 w-5" />
  <span>Back to Course</span>
</Button>

<Button disabled={isLoading} onClick={goToUpdateLecture} className="flex items-center space-x-2">
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <span>Please wait</span>
    </>
  ) : (
    <>
      <PlusCircle className="h-5 w-5 text-blue-500" />
      <span>Create Lecture</span>
    </>
  )}
</Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) :lectureData.lectures.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
  {/* <ExclamationCircle className="h-6 w-6 mr-2 text-yellow-500" /> */}
  <p className="text-lg font-semibold">No lectures available yet</p>
</div>

          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
         
          )}
            {/* <p>No lectures availabe</p> */}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;