import { StyledTopBar } from "app/components/draw-components/top-bar/TopBar.styles";
import { KEYS } from "interaction/interactions.consts";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { useCallback, useMemo, useState } from "react";
import { useStopAlgorithm } from "interaction/external/interaction-node-requests/useStopAlgorithm";
import { useHistory } from "react-router";

const BACK = {
  key: "digital-art",
  title: "Back",
  link: "/digital-art",
};

export const UtilityBar = () => {
  const isUtilityBarVisible = useIsUtilityBarVisible();
  const history = useHistory();
  const stop = useStopAlgorithm();
  const handleClick = () => {
    history.push(BACK.link);
    stop();
  };
  return (
    <StyledTopBar $isVisible={isUtilityBarVisible}>
      <button onClick={handleClick}>Back</button>
    </StyledTopBar>
  );
};

const useIsUtilityBarVisible = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onTabPress = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

  useKeyListener(KEYS.TAB, onTabPress);

  return useMemo(() => isVisible, [isVisible]);
};
