import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    alert("Edit action triggered");
  };

  const handleRemove = () => {
    alert("Remove action triggered");
  };

  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 w-full sm:w-[48%] md:w-[30%] lg:w-[30%] m-2">
      <div className="relative">
        <video
          src="http://res.cloudinary.com/dqec0poc7/video/upload/v1735882011/qkdabnedtrlbxohy2lyd.mp4"
          controls
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-1 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-100 shadow-none"
              >
                <MoreVertical className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg p-2">
              <DropdownMenuItem onClick={handleEdit} className="flex items-center space-x-2 hover:bg-gray-100">
                <Edit className="h-4 w-4 text-blue-500" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRemove}
                className="flex items-center space-x-2 text-red-500 hover:bg-gray-100"
              >
                <Trash2 className="h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center space-x-2">
            <PlayCircle className="h-5 w-5 text-blue-500" />
            <span>Lecture {index + 1}</span>
          </h3>
          <p className="text-sm text-gray-600 truncate">{lecture.title || "Untitled Lecture"}</p>
        </div>
        <Button variant="link" className="mt-4 text-blue-600" onClick={goToUpdateLecture}>
          Update Lecture
        </Button>
      </div>
    </div>
  );
};

const LectureList = ({ lectures }) => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-between gap-4 p-4">
      {lectures.map((lecture, index) => (
        <Lecture key={lecture._id} lecture={lecture} index={index} />
      ))}
    </div>
  );
};

const App = () => {
  const lectures = [
    { _id: "1", title: "Introduction to React" },
    { _id: "2", title: "Understanding State and Props" },
    { _id: "3", title: "Building a To-Do App" },
    { _id: "4", title: "Advanced React Patterns" },
    { _id: "5", title: "React with TypeScript" },
    { _id: "6", title: "State Management with Redux" },
  ];

  return <LectureList lectures={lectures} />;
};

export default App;
