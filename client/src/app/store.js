import {configureStore} from "@reduxjs/toolkit" 
// import authReducer from '../slices/AuthSlice.js'
import rootRedcuer from './rootRedure.js'
import { authApi } from "@/slices/api/AuthApi.js";
  const appStore = configureStore({
    reducer:rootRedcuer,
    middleware:(defaultmiddleware)=>    defaultmiddleware().concat(authApi.middleware)
})
export default appStore;