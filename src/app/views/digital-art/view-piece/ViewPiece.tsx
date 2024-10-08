import { Suspense } from "react";
import { ViewPieceContainer } from "./ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import SceneNode from "visual/node/scene-node/SceneNode";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { useParams } from "react-router";
import { AppContainer } from "app/components/containers/AppContainer";
import { useAppSelector } from "app/redux/store";
import { ScenePlayState } from "app/redux/scene-data/slice";
import InteractiveNode from "interaction/external/interactive-node/InteractiveNode";
import { AppendContainer } from "app/components/AppendContainer";
import EditorNode from "editor/EditorNode";
import { SceneEditor } from "./components/scene-editor/SceneEditor";
import { SceneToolBar } from "./components/scene-toolbar/SceneToolBar";

export const ViewPiece = () => {
  const {
    sceneControls: { scenePlayState },
  } = useAppSelector((state) => state.sceneData);
  return (
    <WindowStateProvider>
      {scenePlayState === ScenePlayState.PLAY && <ViewPieceContent />}
    </WindowStateProvider>
  );
};

const ViewPieceContent = () => {
  // @ts-ignore
  const { sceneid } = useParams();
  const sceneParameters = useSceneParameters(sceneid);
  const {
    sceneControls: { sceneIndex },
  } = useAppSelector((state) => state.sceneData);
  const isInteractive = true;
  const isEditable = true;
  return (
    <>
      <SceneToolBar />
      <SceneEditor />
      <AppContainer>
        <ViewPieceContainer>
          <Suspense>
            {sceneParameters ? (
              <>
                {isEditable ? (
                  <EditorNode
                    {...sceneParameters}
                    key={sceneIndex}
                    isInteractive={isInteractive}
                  />
                ) : isInteractive ? (
                  <InteractiveNode {...sceneParameters} key={sceneIndex} />
                ) : (
                  <SceneNode {...sceneParameters} key={sceneIndex} />
                )}
              </>
            ) : null}
          </Suspense>
        </ViewPieceContainer>
      </AppContainer>
      <AppendContainer />
    </>
  );
};
