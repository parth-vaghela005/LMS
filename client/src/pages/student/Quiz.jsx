import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, BarChart3 } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Quiz() {
  const {lectureId} = useParams()
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.quiz.quiz);
  const { Id } = useParams();
  const [quize, setQuize] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  // Fetch Quiz Data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/auth/quize/${Id}`);
        setQuize(res.data.data);
        console.log("Fetched Quiz:", res.data.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [Id]);

  // Reset selected option when Id changes
  useEffect(() => {
    setSelectedOption("");
  }, [Id]);

  // Get Current Question Number
  const questionNumber = quiz ? quiz.indexOf(Id) + 1 : 1;

  // Navigate to Next Quiz
  const handleNavigate = async() => {

    // const res  = await axios.post(`http://localhost:5000/api/v1/user/quize/check`,{
    //   quizeId: Id,
    //   selectedOption: selectedOption,
    //   lectureId
    // })
    if (!quiz || quiz.length === 0) return;

    const currentIndex = quiz.indexOf(Id);
    if (currentIndex !== -1 && currentIndex < quiz.length - 1) {
      const nextId = quiz[currentIndex + 1];
      navigate(`/${lectureId}/quiz/${nextId}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl bg-white">
        <CardContent>
          {/* Display Question Number & Text */}
          <h2 className="text-2xl font-bold mb-4">
            {quize ? `Q${questionNumber}: ${quize.question}` : "Loading..."}
          </h2>

          {/* Show Options Only If Available */}
          {quize?.options ? (
            <RadioGroup 
              className="space-y-2" 
              value={selectedOption} 
              onValueChange={setSelectedOption}
            >
              {Object.entries(quize.options).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-center space-x-3 p-2 border rounded-lg cursor-pointer transition-all ${
                    selectedOption === key ? "bg-gray-200" : "hover:bg-gray-200"
                  }`}
                >
                  <RadioGroupItem value={key} checked={selectedOption === key} />
                  <span>{key}: {value}</span>
                </label>
              ))}
            </RadioGroup>
          ) : (
            <p className="text-gray-500">Loading options...</p>
          )}

          {/* Buttons Section */}
          <div className="flex justify-between mt-6">
            <Button
              className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-all"
              onClick={handleNavigate}
              disabled={!selectedOption} // Disable if no option is selected
            >
              <ArrowRight className="w-5 h-5 mr-1" />
              Next
            </Button>

            <Button className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-all"
             onClick={()=>{
              navigate('/result')
            }}
            >
              <BarChart3 className="w-5 h-5 mr-1" />
              View Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
