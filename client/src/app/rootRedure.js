import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"; 
import quizReducer from "../slices/quizSlice"; 
import { authApi } from "@/slices/api/AuthApi";
import { courseApi } from "@/slices/api/courseApi";
import { courseProgressApi } from "@/slices/api/courseProgressApi"; // ✅ Import missing API

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer, // ✅ Add missing reducer
    auth: authReducer,
    quiz: quizReducer, 
});

export default rootReducer;
