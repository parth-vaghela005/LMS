import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function CreateQuizForm() {
  const { lectureId } = useParams();  
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const CorrectAnsHandler = (letter) => {
    setSelectedAnswer(letter);
    setTimeout(() => alert(`Selected Answer: ${letter}`), 0);
  };
  const handleInputChange = (letter, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [letter]: value,
    }));
  };

  const handleSubmit = async() => {
    try {
      if (!question.trim()) {
        alert("Please enter a question.");
        return;
      }
      if (Object.values(options).some((opt) => opt.trim() === "")) {
        alert("All options must be filled.");
        return;
      }
      if (!selectedAnswer) {
        alert("Please select the correct answer.");
        return;
      }
      const quizData = {
        question,
        options,
        correctAnswer: selectedAnswer,
      };
  const res  = await axios.post(`http://localhost:5000/api/v1/auth/lecture/${lectureId}/test`,
    quizData
  )
  alert(res.data.message)
      setQuestion("");
      setOptions({ A: "", B: "", C: "", D: "" });
      setSelectedAnswer("");
    } catch (error) {
      alert(error)
    }
   
  };

  const choices = ["A", "B", "C", "D"];

  return (
    <div className="bg-muted p-6 rounded-2xl shadow-lg w-full max-w-lg border">
      {/* Question Input */}
      <h2 className="text-lg font-semibold text-foreground mb-2">Question</h2>
      <Input
        placeholder="Let's ask a question"
        className="mb-4 text-foreground bg-gray-100 border border-border"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Choice Inputs */}
      <h2 className="text-lg font-semibold text-foreground mb-2">Choices</h2>
      {choices.map((letter) => (
        <div key={letter} className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white font-medium">
            {letter}
          </div>
          <Input
            placeholder={`Enter option ${letter}`}
            className="flex-1 bg-gray-100 border border-border text-foreground"
            value={options[letter]}
            onChange={(e) => handleInputChange(letter, e.target.value)}
          />
        </div>
      ))}

      {/* Correct Answer Selection */}
      <h2 className="text-lg font-semibold text-foreground mt-5 mb-2">Correct Answer</h2>
      <div className="flex gap-3">
        {choices.map((letter) => (
          <button
            key={letter}
            className={cn(
              "px-4 py-2 border rounded-lg font-medium flex items-center gap-2 transition-all",
              selectedAnswer === letter
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-background border-border text-foreground hover:bg-gray-700 hover:text-white"
            )}
            onClick={() => CorrectAnsHandler(letter)}
          >
            {letter}
            {selectedAnswer === letter && <Check className="w-4 h-4 text-white" />}
          </button>
        ))}
      </div>

      {/* Create Button */}
      <Button
        className="mt-6 bg-gray-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700"
        onClick={handleSubmit}
      >
        <Plus className="w-5 h-5" />
        Create
      </Button>
    </div>
  );
}
