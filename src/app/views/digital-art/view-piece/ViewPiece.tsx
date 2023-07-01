import React, { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import { InteractiveNode } from "visual/node";

export const ViewPiece = () => {
  const sceneParameters = useSceneParameters();
  return (
    <ViewPieceContainer>
      <Suspense>
        {sceneParameters ? <InteractiveNode {...sceneParameters} /> : null}
      </Suspense>
    </ViewPieceContainer>
  );
};
