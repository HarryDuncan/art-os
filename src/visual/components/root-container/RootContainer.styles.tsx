import styled from 'styled-components/macro';

export const Root = styled.div<{ $height: string; $width: string }>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  overflow: "hidden";
  margin: "0 auto";
  backgroundcolor: "transparent";
  & canvas {
    margin: 0 auto;
  }
`;
