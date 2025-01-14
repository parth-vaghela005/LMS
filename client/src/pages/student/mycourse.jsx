import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '@/slices/api/courseApi';

function MyCourse() {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
    const { data, isLoading, isErro,isSuccess } = useGetCourseByIdQuery(courseId);

console.log(data?.course.lectures);

//   const lectures = [
//     {
//       id: 1,
//       title: 'Introduction to Python',
//       videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8', // Example video URL
//     },
//     {
//       id: 2,
//       title: 'Data Types in Python',
//       videoUrl: 'https://www.youtube.com/embed/khKv-8q7YmY', // Example video URL
//     },
//     {
//       id: 3,
//       title: 'Control Flow',
//       videoUrl: 'https://www.youtube.com/embed/pG3L9qNhwnA', // Example video URL
//     },
//   ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Purchased Lectures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.course.lectures.map((lecture) => (
          <Card key={lecture.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{lecture.lectureTitle}</CardTitle>
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
