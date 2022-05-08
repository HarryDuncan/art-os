import React from "react";
import { AnimationWidget } from "../../components/animation-widget/AnimationWidget";
import { Overlay } from "../../components/overlay/Overlay";
import { LandingContainer, LandingPageTitle } from "./StyledComponents";

export const Landing = () => {
  const landingScene = {
    title: "shaderScene",
    name: "ShaderScene",
    data: { shaderName: "cosmic" },
  };

  return (
    <LandingContainer>
      <Overlay>
        <LandingPageTitle>Welcome To GLO</LandingPageTitle>
      </Overlay>

      <AnimationWidget scenes={[landingScene]} />
    </LandingContainer>
  );
};
