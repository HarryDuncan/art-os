import styled from "styled-components/macro";

export const LayersContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: absolute;
`;

export const LayerImg = styled.img<{
  $height?: number;
  $width?: number;
  $position?: { x: number; y: number };
}>`
  height: ${({ $height }) => ($height ? `${$height}vh` : "100vh")};
  width: ${({ $width }) => ($width ? `${$width}vw` : "100vw")};
`;
