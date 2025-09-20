import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import loginSlice from "./Slices/loginSlice";
import rootSlice from "./Slices/rootSlice";
import cartSlice from "./Slices/cartSlice";

const reducers = combineReducers({
    user: loginSlice,
    appRoot: rootSlice,
    cart: cartSlice
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }), // Removed .concat(thunk)
});

export default store;
