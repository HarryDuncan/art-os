import { useCallback, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

const IDLE_TIMER_TIMEOUT = 5000;

export const useIdleTimerWithComponent = () => {
  const [isIdle, setIsIdle] = useState<boolean>(true);
  const toggleIdleState = useCallback((visibility: boolean) => {
    setIsIdle(visibility);
  }, []);

  useIdleTimer({
    timeout: IDLE_TIMER_TIMEOUT,
    onAction: () => toggleIdleState(true),
    onActive: () => toggleIdleState(true),
    onIdle: () => toggleIdleState(false),
  });

  return { isIdle };
};
