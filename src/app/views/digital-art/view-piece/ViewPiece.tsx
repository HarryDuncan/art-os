import { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import SceneNode from "visual/node/scene-node/SceneNode";

export const ViewPiece = () => {
  const sceneParameters = useSceneParameters();
  return (
    <ViewPieceContainer>
      <Suspense>
        {sceneParameters ? <SceneNode {...sceneParameters} /> : null}
      </Suspense>
    </ViewPieceContainer>
  );
};
