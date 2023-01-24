import React from "react";
// import { useIdleTimerWithComponent } from "app/hooks/useIdleTimer";
import { DigitalArtGallery } from "./digital-art-gallery/DigitalArtGallery";
import { DigitalArtContainer } from "./StyledComponents";
import { Provider as DigitalArtProvider } from "./context/Provider";
import { useDigitalArtContext } from "./context/useDigitalArtContext";
import { ViewPiece } from "./view-piece/ViewPiece";

export function DigitalArt() {
  // const { isIdle: isHeaderVisible } = useIdleTimerWithComponent();
  //   <DigitalArtHeader $isVisible={false}></DigitalArtHeader>
  return (
    <DigitalArtProvider>
      <DigitalArtContainer>
        <DigitalArtContent />
      </DigitalArtContainer>
    </DigitalArtProvider>
  );
}

function DigitalArtContent() {
  const { selectedToViewIndex } = useDigitalArtContext();
  if (selectedToViewIndex === null) return <DigitalArtGallery />;
  return <ViewPiece />;
}
