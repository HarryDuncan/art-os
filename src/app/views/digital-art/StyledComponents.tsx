import styled from "styled-components/macro";
import {
  SIDE_BAR_TRANSITION_SPEED,
  SIDE_BAR_WIDTH,
} from "../../components/navigation/side-bar/SideBar.styles";

const HEADER_HEIGHT = 100;
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
  background-color: ${({ theme }) => theme.colors.mono.ui01};
  height: ${({ $isVisible }) => ($isVisible ? HEADER_HEIGHT : 0)}px;
  transition: width ${SIDE_BAR_TRANSITION_SPEED}s ease-out,
    box-shadow ${SIDE_BAR_TRANSITION_SPEED}s ease-out;
`;
export const GalleryContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;

export const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;
