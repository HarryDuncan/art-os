import { useCallback, useEffect } from "react";
import { useWindowState } from "./windowStateProvider";

export const useSetWindowState = () => {
  const { dispatch } = useWindowState();
  const handleWindowResize = useCallback(() => {
    dispatch({
      type: "SET_WINDOW_SIZE",
      payload: { width: window.innerWidth, height: window.innerHeight },
    });
  }, [dispatch]);

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);
};
