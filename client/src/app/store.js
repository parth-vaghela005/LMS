import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootRedure.js";
import { authApi } from "@/slices/api/AuthApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage for web

// Configuration for persisting
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // Add reducers you want to persist
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware({ serializableCheck: false }).concat(authApi.middleware),
});

export const persistor = persistStore(appStore);
export default appStore;
