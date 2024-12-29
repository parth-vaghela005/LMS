import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/slices/api/courseApi"; // Adjusted for the correct import
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading, isSuccess,refetch } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Button onClick={() => navigate("create")}>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{course.courseTitle || "MongoDB"}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
