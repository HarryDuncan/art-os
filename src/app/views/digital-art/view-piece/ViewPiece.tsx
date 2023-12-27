import { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import SceneNode from "visual/node/scene-node/SceneNode";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { useParams } from "react-router";
import { AppContainer } from "app/components/containers/AppContainer";

export const ViewPiece = () => (
  <WindowStateProvider>
    <ViewPieceContent />
  </WindowStateProvider>
);

const ViewPieceContent = () => {
  const { sceneid } = useParams();
  const sceneParameters = useSceneParameters(sceneid);
  return (
    <AppContainer>
      <ViewPieceContainer>
        <Suspense>
          {sceneParameters ? <SceneNode {...sceneParameters} /> : null}
        </Suspense>
      </ViewPieceContainer>
    </AppContainer>
  );
};
