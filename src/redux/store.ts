import {
  configureStore,
  AnyAction,
  ThunkAction,
  ThunkDispatch,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { middleware } from "./middleware";
import { IGlobalState, rootReducer } from "./reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IGlobalState,
  unknown,
  AnyAction
>;

export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<IGlobalState, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<IGlobalState> = useSelector;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});
