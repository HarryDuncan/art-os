import React, { createContext, useContext, useEffect, useReducer } from "react";
import { windowStateReducer } from "./windowStateReducer";
import { WindowSize, WindowStateContextProps } from "./types";

const WindowStateContext = createContext<WindowStateContextProps | undefined>(
  undefined
);
export const useWindowState = (): WindowStateContextProps => {
  const context = useContext(WindowStateContext);
  if (!context) {
    throw new Error("useWindowState must be used within a WindowStateProvider");
  }
  return context;
};

export const WindowStateProvider = ({ children }: { children }) => {
  const [state, dispatch] = useReducer(windowStateReducer, {
    windowSize: { width: 0, height: 0 },
    devicePixelRatio: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowSize: WindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      dispatch({ type: "SET_WINDOW_SIZE", payload: windowSize });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowStateContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowStateContext.Provider>
  );
};
