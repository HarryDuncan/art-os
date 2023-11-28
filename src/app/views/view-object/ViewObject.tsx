import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { Container } from "../views.styles";
import { AssetFileUpload } from "./AssetFileUpload";

export const ViewObject = () => {
  const onFileLoaded = (file) => {};
  return (
    <WindowStateProvider>
      <Container>
        <AssetFileUpload onFileLoad={onFileLoaded}>
          {" "}
          <Suspense>
            {sceneParameters ? <SceneNode {...sceneParameters} /> : null}
          </Suspense>
        </AssetFileUpload>
      </Container>
    </WindowStateProvider>
  );
};
