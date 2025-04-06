import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizResult() {
  const [showResult, setShowResult] = useState(true);
  const navigate = useNavigate();

  // Sample Quiz Result Data
  const quizResults = [
    { id: 1, question: "What is React?", userAnswer: "Library", correctAnswer: "Library", isCorrect: true },
    { id: 2, question: "Which hook is used for state?", userAnswer: "useEffect", correctAnswer: "useState", isCorrect: false },
    { id: 3, question: "What does JSX stand for?", userAnswer: "Java XML", correctAnswer: "JavaScript XML", isCorrect: false },
    { id: 4, question: "Which method fetches data in React?", userAnswer: "fetch()", correctAnswer: "useEffect", isCorrect: false },
  ];

  // Handle Close Dialog (Navigate to Home)
  const handleClose = () => {
    setShowResult(false);
    navigate("/"); // Navigate to home after closing
  };

  return (
    <Dialog open={showResult} onOpenChange={() => {}} /* Prevent closing on background click */>
      <DialogContent className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-0 overflow-hidden">
        
        {/* 🔹 Fixed Header */}
        <DialogHeader className="p-5 bg-gray-900 text-white flex justify-between items-center sticky top-0 z-10">
          <DialogTitle className="text-lg font-bold">Quiz Results</DialogTitle>
          <XCircle className="w-6 h-6 text-white cursor-pointer hover:text-red-400 transition" onClick={handleClose} />
        </DialogHeader>

        {/* 🔹 Scrollable Content */}
        <div className="max-h-[350px] overflow-y-auto p-4 space-y-3">
          
          {/* ✅ Summary */}
          <div className="text-center border-b pb-3">
            <p className="text-lg font-semibold">Total Questions: {quizResults.length}</p>
            <p className="text-lg font-semibold text-green-500">
              Correct Answers: {quizResults.filter(q => q.isCorrect).length}
            </p>
            <p className="text-lg font-semibold text-red-500">
              Wrong Answers: {quizResults.filter(q => !q.isCorrect).length}
            </p>
          </div>

          {/* ✅ List of Questions */}
          {quizResults.map((q, index) => (
            <div key={q.id} className="p-3 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
              <p className="text-md font-semibold">Q{index + 1}: {q.question}</p>
              <p className={`mt-2 flex items-center font-semibold ${q.isCorrect ? "text-green-600" : "text-red-600"}`}>
                {q.isCorrect ? <CheckCircle className="w-5 h-5 mr-2 text-green-600" /> : <XCircle className="w-5 h-5 mr-2 text-red-600" />}
                {q.isCorrect ? "Correct" : "Wrong"}
              </p>
              <p className="text-gray-700"><span className="font-semibold">Your Answer:</span> {q.userAnswer}</p>
              <p className="text-gray-900 font-semibold"><span className="text-gray-600">Correct Answer:</span> {q.correctAnswer}</p>
            </div>
          ))}
        </div>

        {/* 🔹 Fixed Footer */}
        <div className="p-4 bg-gray-100 flex justify-center sticky bottom-0 z-10 border-t">
          <Button className="bg-gray-900 text-white font-semibold py-2 w-full rounded-lg hover:bg-gray-800 transition" onClick={handleClose}>
            Close & Go Home
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
