import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/slices/api/courseApi";
import HorizontalLoader from "./HorizontalLoader";

const MEDIA_API = "http://localhost:5000/api/v1/media";
const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData, refetch, isLoading: isLectureLoading } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  const [editLecture, { isLoading, isSuccess, error }] = useEditLectureMutation();
  const [removeLecture, { isLoading: removeLoading, isSuccess: removeSuccess }] =
    useRemoveLectureMutation();

  // Populate state when lecture data is loaded
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo); // Set video information
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        return toast.error("File size exceeds 10MB");
      }
      if (!file.type.startsWith("video/")) {
        return toast.error("Please upload a valid video file");
      }

      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lecture updated successfully");
    }
    if (error) {
      toast.error("An error occurred while updating the lecture");
    }
  }, [isSuccess, error]);

  if (isLectureLoading) {
    return <p>Loading lecture details...</p>;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to JavaScript"
          />
        </div>
        <div className="flex  my-5 justify-between">
        <div className="">
         <div>
          <div>
            <Label>Upload New Video</Label>
            <Input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="w-fit"
            />
          </div>
       
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="isFreeSwitch"
          />
          <Label htmlFor="isFreeSwitch">Is this video FREE?</Label>
        </div>
        {mediaProgress && (
          <HorizontalLoader/>
        )}
        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
        </div>
        <div>
          {uploadVideoInfo?.videoUrl && (
            <div>
              <video width="300" controls>
                <source src={uploadVideoInfo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
