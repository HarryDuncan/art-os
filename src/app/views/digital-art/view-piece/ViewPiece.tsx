import React, { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { InteractiveSceneContainer } from "visual/display/containers";
import { useSceneData } from "scenes/useSceneData";

export const ViewPiece = () => {
  const sceneData = useSceneData();

  return (
    <ViewPieceContainer>
      <Suspense>
        {sceneData ? <InteractiveSceneContainer {...sceneData} /> : null}
      </Suspense>
    </ViewPieceContainer>
  );
};
