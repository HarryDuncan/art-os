import React from "react";
import { PageTitle } from "../../components/page-text";
import { DigitalArtGallery } from "./digital-art-gallery/DigitalArtGallery";
import { DigitalArtContainer, DigitalArtHeader } from "./StyledComponents";
import { Provider as DigitalArtProvider } from "./context/Provider";
import { useDigitalArtContext } from "./context/useDigitalArtContext";
import { ViewPiece } from "./view-piece/ViewPiece";
import { useIdleTimerWithComponent } from "app/hooks/useIdleTimer";

export function DigitalArt() {
  const { isIdle: isHeaderVisible } = useIdleTimerWithComponent();
  return (
    <DigitalArtProvider>
      <DigitalArtContainer>
        <DigitalArtHeader $isVisible={isHeaderVisible}>
          <PageTitle>Digital Art</PageTitle>
        </DigitalArtHeader>
        <DigitalArtContent />
      </DigitalArtContainer>
    </DigitalArtProvider>
  );
}

function DigitalArtContent() {
  const { selectedToViewIndex } = useDigitalArtContext();
  return (
    <>{selectedToViewIndex !== null ? <ViewPiece /> : <DigitalArtGallery />}</>
  );
}
