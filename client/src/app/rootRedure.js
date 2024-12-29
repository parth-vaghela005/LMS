import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"; 
import { authApi } from "@/slices/api/AuthApi";
import { courseApi } from "@/slices/api/courseApi";
const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;