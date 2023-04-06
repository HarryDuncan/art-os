import React from "react";
import { DigitalArtGallery } from "./digital-art-gallery/DigitalArtGallery";
import { DigitalArtContainer } from "./StyledComponents";
import { ViewPiece } from "./view-piece/ViewPiece";
import { useAppSelector } from "app/redux/store";

export function DigitalArt() {
  const { configId } = useAppSelector((state) => state.sceneData);
  return (
    <DigitalArtContainer>
      {configId ? <ViewPiece /> : <DigitalArtGallery />}
    </DigitalArtContainer>
  );
}
