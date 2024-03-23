import { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import SceneNode from "visual/node/scene-node/SceneNode";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { useParams } from "react-router";
import { AppContainer } from "app/components/containers/AppContainer";
import { useAppSelector } from "app/redux/store";
import { ScenePlayState } from "app/redux/scene-data/slice";
import InteractiveNode from "interaction/external/interactive-node/InteractiveNode";

export const ViewPiece = () => {
  const {
    sceneControls: { scenePlayState },
  } = useAppSelector((state) => state.sceneData);
  return (
    <WindowStateProvider>
      {scenePlayState === ScenePlayState.PLAY && <ViewPieceContent />}
    </WindowStateProvider>
  );
};

const ViewPieceContent = () => {
  // @ts-ignore
  const { sceneid } = useParams();
  const sceneParameters = useSceneParameters(sceneid);
  const {
    sceneControls: { sceneIndex },
  } = useAppSelector((state) => state.sceneData);
  const isInteractive = true;
  return (
    <AppContainer>
      <ViewPieceContainer>
        <Suspense>
          {sceneParameters ? (
            <>
              {isInteractive ? (
                <InteractiveNode {...sceneParameters} key={sceneIndex} />
              ) : (
                <SceneNode {...sceneParameters} key={sceneIndex} />
              )}
            </>
          ) : null}
        </Suspense>
      </ViewPieceContainer>
    </AppContainer>
  );
};
