import React from "react";
import { DigitalArtGallery } from "./digital-art-gallery/DigitalArtGallery";
import { DigitalArtContainer } from "./StyledComponents";
import { ViewPiece } from "./view-piece/ViewPiece";
import { useAppSelector } from "app/redux/store";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { useSetWindowState } from "visual/compat/window-state/useSetWindowState";

export const DigitalArt = () => (
  <WindowStateProvider>
    <DigitalArtContent />
  </WindowStateProvider>
);

const DigitalArtContent = () => {
  const { configId } = useAppSelector((state) => state.sceneData);
  useSetWindowState();
  return (
    <DigitalArtContainer>
      {configId ? <ViewPiece /> : <DigitalArtGallery />}
    </DigitalArtContainer>
  );
};
