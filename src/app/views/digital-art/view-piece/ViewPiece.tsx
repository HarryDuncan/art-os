import React from "react";
import { useDigitalArtContext } from "../context/useDigitalArtContext";
import { useViewPiece } from "./useViewPiece";
import { ViewPieceContainer } from "./ViewPiece.styles";

export function ViewPiece() {
  const { selectedToViewIndex: index, pieces } = useDigitalArtContext();
  const { component } = useViewPiece(pieces, index);

  return <ViewPieceContainer>{component}</ViewPieceContainer>;
}
