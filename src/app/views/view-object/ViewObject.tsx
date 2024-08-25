import { Container } from "../views.styles";
import { AssetFileUpload } from "../../components/asset-file-upload/AssetFileUpload";
import { Suspense } from "react";
import SceneNode from "visual/node/scene-node/SceneNode";
import { useSceneParameters } from "scenes/useSceneParameters";
import { loadModel } from "visual/set-up/assets/geometry/load-model/LoadModel";
import { getObjectGeometries } from "visual/set-up/config/mesh/geometry/getAssetGeometries";
import { Mesh, MeshStandardMaterial } from "three";
import { onMeshAdded } from "visual/display/engine/engineEvents";
import { LoadedGroup } from "visual/set-up/assets/asset.types";
import { AppContainer } from "app/components/containers/AppContainer";

export const ViewObject = () => {
  const onFileLoaded = async (file) => {
    const b64 = btoa(file);
    const dataURL = `data:model/obj+json;base64,${b64}`;
    const loadedModel = (await loadModel(dataURL, "obj")) as LoadedGroup;
    if (loadedModel) {
      const geometry = getObjectGeometries(loadedModel, "geometry");
      const mesh = new Mesh(geometry[0].geometry, new MeshStandardMaterial({}));
      onMeshAdded(mesh);
    }
  };
  const sceneParameters = useSceneParameters();
  return (
    <AppContainer>
      <Container>
        <AssetFileUpload onFileLoad={onFileLoaded}>
          <Suspense>
            {sceneParameters ? <SceneNode {...sceneParameters} /> : null}
          </Suspense>
        </AssetFileUpload>
      </Container>
    </AppContainer>
  );
};
