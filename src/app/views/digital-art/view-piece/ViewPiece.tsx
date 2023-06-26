import React, { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { InteractiveSceneContainer } from "visual/display/containers";
import { useSceneParameters } from "scenes/useSceneParameters";

export const ViewPiece = () => {
  const sceneParameters = useSceneParameters();
  return (
    <ViewPieceContainer>
      <Suspense>
        {sceneParameters ? (
          <InteractiveSceneContainer {...sceneParameters} />
        ) : null}
      </Suspense>
    </ViewPieceContainer>
  );
};
