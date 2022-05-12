import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { middleware } from "app/redux/middleware";
import { IGlobalState, rootReducer } from "app/redux/reducer";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { WithTheme } from "./WithTheme";

export const mockStore = (state: IWithStoreState = {}) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
    preloadedState: state,
  });
};

// Allows for passing partial store state for testing purposes
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type IWithStoreState = RecursivePartial<IGlobalState>;

interface IWithStoreProps {
  state?: IWithStoreState;
}

export const WithStore = ({
  children,
  state = {},
}: PropsWithChildren<IWithStoreProps>) => (
  <WithTheme>
    <Provider store={mockStore(state)}>{children}</Provider>
  </WithTheme>
);
