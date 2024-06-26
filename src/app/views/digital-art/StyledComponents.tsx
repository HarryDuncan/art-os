import { SIDE_BAR_TRANSITION_SPEED } from "app/components/drawer/DrawerComponent.styles";
import { SIDE_BAR_WIDTH } from "app/components/drawer/vertical-drawer/VerticalDrawer.styles";
import styled from "styled-components/macro";

const HEADER_HEIGHT = 100;
const GALLERY_SIDE_MARGIN = 100;
export const DigitalArtContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  padding-left: ${SIDE_BAR_WIDTH};
  position: relative;
`;

export const DigitalArtHeader = styled.div<{ $isVisible: boolean }>`
  display: flex;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.mono.darkText};
  height: ${({ $isVisible }) => ($isVisible ? HEADER_HEIGHT : 0)}px;
  transition: width ${SIDE_BAR_TRANSITION_SPEED}s ease-out,
    box-shadow ${SIDE_BAR_TRANSITION_SPEED}s ease-out;
`;
export const GalleryContainer = styled.div`
  width: 70%;
  margin-left: ${SIDE_BAR_WIDTH + GALLERY_SIDE_MARGIN}px;
`;

export const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;
