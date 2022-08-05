import React from "react";
import { AnimationWidget } from "../../../visual/visual-components/animation-widget";
import { Overlay } from "../../components/overlay/Overlay";
import { LandingContainer, LandingPageTitle } from "./Landing.styles";

export function Landing() {
  const shaderSceneNames = ["liquid", "cosmic"];

  const landingScenes = shaderSceneNames.map((scene: string) => ({
    title: "shaderScene",
    name: "GenericShaderScene",
    data: { shaderName: scene },
  }));

  return (
    <LandingContainer>
      <Overlay>
        <LandingPageTitle>Art-OS</LandingPageTitle>
      </Overlay>
      <AnimationWidget scenes={landingScenes} />
    </LandingContainer>
  );
}
