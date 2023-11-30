import { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import SceneNode from "visual/node/scene-node/SceneNode";

interface ViewPieceProps {
  configId: string;
}
export const ViewPiece = ({ configId }: ViewPieceProps) => {
  const sceneParameters = useSceneParameters(configId);
  return (
    <ViewPieceContainer>
      <Suspense>
        {sceneParameters ? <SceneNode {...sceneParameters} /> : null}
      </Suspense>
    </ViewPieceContainer>
  );
};
