import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"; 
import { authApi } from "@/slices/api/AuthApi";
const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;