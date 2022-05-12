import React, { ReactNode, useReducer } from "react";
import { Context, defaultState, DigitalArtState } from "./Context";
import { reducer } from "./slice";

interface IProps {
  children: ReactNode;
  initialState?: DigitalArtState;
}
export const Provider = ({ children, initialState = defaultState }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
