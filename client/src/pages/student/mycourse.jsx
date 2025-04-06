import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '@/slices/api/courseApi';
import { Button} from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {  incrementIndex,setQuizData } from "@/slices/quizSlice";
import axios from 'axios';
function MyCourse() {
    const params = useParams();
    const courseId = params.courseId;
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { data, isLoading, isErro,isSuccess } = useGetCourseByIdQuery(courseId);
    // alert()
// console.log(data?.course.lectures);
const Handlegetquize = async(lectureId) =>{
 const res  = await axios.get(`http://localhost:5000/api/v1/auth/lecture/${lectureId}`)
 dispatch(setQuizData(res.data.lecture.test));
 navigate(`/${lectureId}/quiz/${res.data.lecture.test[0]}`)
//  dispatch(incrementIndex());
//  console.log(res.data.lecture.test)
}
// alert(data?.course.lectures)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Purchased Lectures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.course.lectures.map((lecture) => (
          <Card key={lecture.id} className="shadow-md">
            <CardHeader className={'flex flex-row justify-between items-center '}>
          
              <CardTitle className="text-lg font-semibold">{lecture.lectureTitle}</CardTitle>
              <Button onClick={()=>Handlegetquize(lecture._id)}>test give</Button>
            </CardHeader>
            <CardContent>
         
              <div className="mt-4">

                <iframe
                  src={lecture.videoUrl}
                  title={lecture.lectureTitle}
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyCourse;
