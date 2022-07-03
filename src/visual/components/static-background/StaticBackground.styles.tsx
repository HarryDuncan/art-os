import styled from "styled-components/macro";

export const StaticBackgroundContainer = styled.div<{
  $backgroundUrl?: string;
  $backgroundColor?: string;
}>`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -2;
  top: 0;
  background-image: ${({ $backgroundUrl }) =>
    $backgroundUrl
      ? $backgroundUrl
      : `url(../assets/textures/HJDInverted.jpg)`};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : "white"};
`;
