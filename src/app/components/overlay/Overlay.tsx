import React, { ReactNode } from "react";
import { OverlayContainer, OverlayPane } from "./Overlay.styles";

interface IOverlayProps {
  children: ReactNode;
}

export const Overlay = ({ children }: IOverlayProps) => {
  return (
    <OverlayContainer>
      {children}
      <OverlayPane />
    </OverlayContainer>
  );
};
