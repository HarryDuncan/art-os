import styled from "styled-components";

export const Root = styled.div<{
  $height: string;
  $width: string;
  $backgroundColor?: string;
  $fixed?: boolean;
  $position?: string;
}>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  overflow: hidden;
  margin: 0 auto;
  position: ${({ $position }) => $position ?? "relative"};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ?? "transparent"};
  & canvas {
    margin: 0 auto;
  }
`;

// background-image: ${({ $backgroundUrl }) => ($backgroundUrl || 'url()')};
