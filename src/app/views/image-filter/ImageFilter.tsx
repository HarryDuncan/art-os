import { AppContainer } from "app/components/containers/AppContainer";
import { ViewPieceContainer } from "../digital-art/view-piece/ViewPiece.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import { Suspense } from "react";
import SceneNode from "visual/node/scene-node/SceneNode";
import { AssetFileUpload } from "../../components/asset-file-upload/AssetFileUpload";
import { UPLOAD_RETURN_TYPES } from "app/components/asset-file-upload/AssetFileUpload.consts";
import { setCustomConfigData } from "app/redux/scene-data/actions";
import { Asset } from "visual/set-up/assets/asset.types";
import { useAppDispatch } from "app/redux/store";

const IMAGE_FILTER_SCENE_ID = "image-filter";

function transformPath(filePath: string): string {
  return filePath.replace(/^.*\\public\\/, "../");
}

export const ImageFilter = () => {
  const sceneParameters = useSceneParameters(IMAGE_FILTER_SCENE_ID);
  const dispatch = useAppDispatch();
  // update the material uniform config to add the texture dimensions
  // format the material to create the buffer geometry

  // const onImageLoaded = async (file) => {
  //   const url = transformPath(file.path);
  //   const imageAsset = {
  //     name: "image",
  //     id: "image",
  //     url: url,
  //     assetType: "TEXTURE",
  //   } as Asset;
  //   const mergedConfigData = {
  //     assets: [imageAsset],
  //   };
  //   dispatch(setCustomConfigData(mergedConfigData));
  // };

  return (
    <AppContainer>
      <ViewPieceContainer>
        <Suspense>
          {sceneParameters ? <SceneNode {...sceneParameters} /> : null}
        </Suspense>
      </ViewPieceContainer>
    </AppContainer>
  );
};
