import React from "react";
import { StaticBackgroundContainer } from "./StaticBackground.styles";

interface StaticBackgroundProps {
  url?: string;
}
export function StaticBackground({ url }: StaticBackgroundProps) {
  return <StaticBackgroundContainer $backgroundUrl={`url(${url})`} />;
}
