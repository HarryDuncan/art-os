import React, { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { InteractiveSceneContainer } from "visual/display/containers";
import { useSceneParameters } from "scenes/useSceneParameters";
import { WindowStateProvider } from "compat/providers/windowSizeProvider";

export const ViewPiece = () => {
  const sceneParameters = useSceneParameters();
  return (
    <WindowStateProvider>
      <ViewPieceContainer>
        <Suspense>
          {sceneParameters ? (
            <InteractiveSceneContainer {...sceneParameters} />
          ) : null}
        </Suspense>
      </ViewPieceContainer>
    </WindowStateProvider>
  );
};
