import React from "react";
import { StaticBackgroundContainer } from "./StaticBackground.styles";

interface StaticBackgroundProps {}
export function StaticBackground() {
  return (
    <StaticBackgroundContainer $backgroundUrl="url(../assets/textures/HJDInverted.jpg)" />
  );
}
