import styled from "styled-components";

export const Root = styled.div<{
  $height: string;
  $width: string;
  $backgroundColor?: string;
}>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  overflow: "hidden";
  margin: "0 auto";
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ?? "transparent"};
  & canvas {
    margin: 0 auto;
  }
`;

// background-image: ${({ $backgroundUrl }) => ($backgroundUrl || 'url()')};
