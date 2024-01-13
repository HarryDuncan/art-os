import {
  StyledTopBar,
  TopBarItem,
} from "app/components/draw-components/top-bar/TopBar.styles";
import { KEYS } from "interaction/interactions.consts";
import { useKeyListener } from "interaction/internal/useSetUpKeyListener";
import { useCallback, useMemo, useState } from "react";
import { useStopAlgorithm } from "interaction/external/interaction-node-requests/useStopAlgorithm";
import { useHistory } from "react-router";
import { SpinButton } from "app/components/inputs/spin-button/SpinButton";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { setSceneIndex } from "app/redux/scene-data/actions";
import { useRestartScene } from "app/hooks/useRestartScene";
import { SceneCaptureController } from "external-services/scene-capture/components/SceneCaptureController";

const BACK = {
  key: "digital-art",
  title: "Back",
  link: "/digital-art",
};

export const UtilityBar = () => {
  const isUtilityBarVisible = useIsUtilityBarVisible();
  return (
    <StyledTopBar $isVisible={isUtilityBarVisible}>
      <StopButton />
      <UpdateSceneSpin />
      <TopBarItem>
        <SceneCaptureController />
      </TopBarItem>
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

const StopButton = () => {
  const history = useHistory();
  const stop = useStopAlgorithm();
  const handleClick = () => {
    history.push(BACK.link);
    stop();
  };
  return (
    <TopBarItem>
      <button onClick={handleClick}>Back</button>
    </TopBarItem>
  );
};

const UpdateSceneSpin = () => {
  const {
    sceneControls: { sceneIndex, sceneCount },
  } = useAppSelector((state) => state.sceneData);
  const appDispatch = useAppDispatch();
  const restartScene = useRestartScene();
  const handleChange = (updatedValue: number) => {
    restartScene();
    appDispatch(setSceneIndex(updatedValue));
  };
  return (
    <TopBarItem>
      <SpinButton
        value={sceneIndex}
        min={0}
        max={sceneCount}
        onChange={handleChange}
      />
    </TopBarItem>
  );
};
