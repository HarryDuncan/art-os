import React from "react";
import { useDigitalArtContext } from "../context/useDigitalArtContext";
import { useViewPiece } from "./useViewPiece";
import { ViewPieceContainer, ViewPieceHeader } from "./ViewPiece.styles";

export function ViewPiece() {
  const { selectedToViewIndex: index, pieces } = useDigitalArtContext();
  const { component, title } = useViewPiece(pieces, index);

  return (
    <ViewPieceContainer>
      <ViewPieceHeader>{title}</ViewPieceHeader>
      {component}
    </ViewPieceContainer>
  );
}
