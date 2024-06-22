import { TopBarItem } from "app/components/drawer/horizontal-drawer/HorizontalDrawer.styles";
import { KEYS } from "interaction/interactions.consts";
import { useStopAlgorithm } from "interaction/external/interaction-node-requests/useStopAlgorithm";
import { useHistory } from "react-router";
import { SpinButton } from "app/components/inputs/spin-button/SpinButton";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { setSceneIndex } from "app/redux/scene-data/actions";
import { useRestartScene } from "app/hooks/useRestartScene";
import { SceneCaptureController } from "external-services/scene-capture/components/SceneCaptureController";
import { useLoopThroughScenes } from "app/hooks/loop-through/useLoopThroughScenes";
import { HorizontalDraw } from "app/components/drawer/horizontal-drawer/HorizontalDrawer";

const BACK = {
  key: "digital-art",
  title: "Back",
  link: "/digital-art",
};

export const UtilityBar = () => {
  return (
    <HorizontalDraw keyCode={KEYS.TAB}>
      <>
        <StopButton />
        <UpdateSceneSpin />
        <TopBarItem>
          <SceneCaptureController />
        </TopBarItem>
        <TopBarItem>
          <LoopThrough />
        </TopBarItem>
      </>
    </HorizontalDraw>
  );
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
      <button type="submit" onClick={handleClick}>
        Back
      </button>
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

const LoopThrough = () => {
  const loopThroughScenes = useLoopThroughScenes();
  return (
    <TopBarItem>
      <button type="submit" onClick={loopThroughScenes}>
        Loop Through
      </button>
    </TopBarItem>
  );
};
