import { Overlay } from "../../components/overlay/Overlay";
import { LandingContainer, LandingPageTitle } from "./Landing.styles";
import { AppContainer } from "app/components/containers/AppContainer";

export function Landing() {
  // const shaderSceneNames = ["liquid", "cosmic"];

  // const landingScenes = shaderSceneNames.map((scene: string) => ({
  //   title: "shaderScene",
  //   name: "GenericShaderScene",
  //   data: { shaderName: scene },
  // }));

  return (
    <AppContainer>
      <LandingContainer>
        <Overlay>
          <LandingPageTitle>Art-OS</LandingPageTitle>
        </Overlay>
      </LandingContainer>
    </AppContainer>
  );
}
