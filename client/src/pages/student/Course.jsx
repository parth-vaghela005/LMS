import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course= () => {
  return (
    <Link to={`/course-detail/1 `}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src='https://th.bing.com/th/id/OIP.QbXDpOIXe2_46a8o1UG8AQHaD1?rs=1&pid=ImgDetMain'
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
      C Language
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Denis ritchi</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
        Medium
          </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹1000</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;