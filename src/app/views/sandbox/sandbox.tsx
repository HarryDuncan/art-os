import React from "react";
import { LTW } from "visual/visual-components/react-fiber-scene/LTW";
import { MarshLong } from "visual/visual-components/react-fiber-scene/MarshLong";
import { ReactFiberScene } from "visual/visual-components/react-fiber-scene/ReactFiberScene";
import { ViewPieceContainer } from "../digital-art/view-piece/ViewPiece.styles";

export function Sandbox() {
  return (
    <ViewPieceContainer>
      <LTW />
    </ViewPieceContainer>
  );
}
