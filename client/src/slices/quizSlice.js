import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0, 
  quiz: [], 
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    incrementIndex: (state) => {
        // if (state.index < state.quiz.length - 1) {
          state.index += 1;
        // }
      },
    setQuizData: (state, action) => {
      state.quiz = action.payload;
      state.index = 0; 
    },
  },
});

export const { incrementIndex, setQuizData } = quizSlice.actions;
export default quizSlice.reducer;
