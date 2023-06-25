import React, { createContext, useContext, useReducer, useEffect } from "react";

interface WindowState {
  width: number;
  height: number;
}

interface WindowStateState {
  windowSize: WindowState;
}

type WindowStateAction =
  | { type: "SET_WINDOW_SIZE"; payload: WindowState }
  | { type: "RESET_WINDOW_SIZE" };

interface WindowStateContextProps {
  windowSizeState: WindowStateState;
  dispatch: React.Dispatch<WindowStateAction>;
}

const WindowStateContext = createContext<WindowStateContextProps | undefined>(
  undefined
);

const windowSizeReducer = (
  state: WindowStateState,
  action: WindowStateAction
): WindowStateState => {
  switch (action.type) {
    case "SET_WINDOW_SIZE":
      return { windowSize: action.payload };
    case "RESET_WINDOW_SIZE":
      return { windowSize: { width: 0, height: 0 } };
    default:
      return state;
  }
};

export const WindowStateProvider = ({ children }: { children: any }) => {
  const [windowSizeState, dispatch] = useReducer(windowSizeReducer, {
    windowSize: { width: 0, height: 0 },
  });

  useEffect(() => {
    const handleResize = () => {
      const windowSize: WindowState = {
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
    <WindowStateContext.Provider value={{ windowSizeState, dispatch }}>
      {children}
    </WindowStateContext.Provider>
  );
};

export const useWindowState = (): WindowStateContextProps => {
  const context = useContext(WindowStateContext);
  if (!context) {
    throw new Error("useWindowState must be used within a WindowStateProvider");
  }
  return context;
};
