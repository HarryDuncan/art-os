import styled from "styled-components";

export const Root = styled.div<{
  $height: string;
  $width: string;
  $backgroundColor?: string;
  $backgroundUrl?: string;
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
  background-image: ${({ $backgroundUrl }) =>
    $backgroundUrl
      ? `url(${$backgroundUrl})`
      : "none"}; // Set background image if $backgroundUrl is provided
  background-size: cover; // Optional: Adjust background size as needed
  & canvas {
    margin: 0 auto;
  }
`;

// background-image: ${({ $backgroundUrl }) => ($backgroundUrl || 'url()')};
