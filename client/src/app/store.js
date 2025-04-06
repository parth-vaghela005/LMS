import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootRedure"; 
import { authApi } from "@/slices/api/AuthApi";
import { courseApi } from "@/slices/api/courseApi";
import { courseProgressApi } from "@/slices/api/courseProgressApi"; // ✅ Import missing API
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "quiz"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware({ serializableCheck: false }).concat(
            authApi.middleware,
            courseApi.middleware,
            courseProgressApi.middleware // ✅ Add missing middleware
        ),
});

export const persistor = persistStore(appStore);
export default appStore;
