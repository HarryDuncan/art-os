import styled from "styled-components";

export const OverlayContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 20;
`;
export const OverlayPane = styled.div`
  background-color: ${({ theme }) => theme.colors.mono.ui01};
  height: 100%;
  width: 100%;
  opacity: 0.7;
`;
