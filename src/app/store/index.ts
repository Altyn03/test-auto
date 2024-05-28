import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import devicesReducer from "../../processes/devices/devicesReducer";
import userReducer from "../../processes/user/userReducer";

const rootReducer = combineReducers({
    devices: devicesReducer,
    user: userReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
