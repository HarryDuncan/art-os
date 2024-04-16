import { useCallback } from "react";
import { Container } from "../views.styles";
import { handleExportClick } from "./export/exportAsObj";
import { CONFIG } from "app/constants";
import { useFetchData } from "app/hooks/useFetchData";
import { extractMetadata } from "./geometry/extract-metadata/extractMetadata";
import { downloadJsonFile } from "./export/downloadJson";
import { setSameVertexCount } from "./geometry/vertex/setSameVertexCount";
import { addAdditionalVerticies } from "./geometry/vertex/add-shapes/addAdditionalVertices";
import { preTransformGeometry } from "./pre-transform/preTransform";
import { AppContainer } from "app/components/containers/AppContainer";
import { useAssets } from "visual/set-up/assets/useAssets";
import { Asset } from "visual/set-up/assets/asset.types";
import { getAssetBufferGeometry } from "visual/set-up/config/mesh/geometry/getAssetGeometries";

const preTranformConfig = {
  centerGeometry: true,
};
export const GeometryPreprocess = () => {
  const assets = useFetchData(`${CONFIG}assets/blackout.json`);
  const { initializedAssets, areAssetsInitialized } = useAssets(
    assets as Asset[]
  );

  const sameVertices = useCallback(() => {
    const preTransformed = preTransformGeometry(
      initializedAssets,
      preTranformConfig
    );
    const assetMetaData = extractMetadata(preTransformed);

    const maxVertexCount = Math.max(
      ...assetMetaData.map(({ metaData }) => metaData?.vertexCount ?? 0)
    );
    const transformedGeometry = preTransformed.flatMap((asset, index) => {
      const bufferGeometry = getAssetBufferGeometry(asset);
      if (bufferGeometry) {
        const { metaData } = assetMetaData[index];
        if (!metaData) {
          console.warn(`no metadata found for ${asset.name}`);
          return [];
        }

        const originalBufferGeometry = getAssetBufferGeometry(
          initializedAssets[index]
        );

        return setSameVertexCount(
          bufferGeometry,
          originalBufferGeometry,
          maxVertexCount
        );
      }
      console.warn(`no buffer geometry found for ${asset.name}`);
      return [];
    });
    transformedGeometry.forEach(async (transformed, index) => {
      const fileName = initializedAssets[index].name;
      const geometryId = initializedAssets[index].id;
      await handleExportClick(transformed, geometryId, fileName);
    });
  }, [initializedAssets]);
  const addVertices = useCallback(() => {
    const preTransformed = preTransformGeometry(
      initializedAssets,
      preTranformConfig
    );
    const assetMetaData = extractMetadata(preTransformed);

    const maxVertexCount = Math.max(
      ...assetMetaData.map(({ metaData }) => metaData?.vertexCount ?? 0)
    );
    const transformedGeometry = preTransformed.flatMap((asset, index) => {
      const bufferGeometry = getAssetBufferGeometry(asset);
      if (bufferGeometry) {
        const { metaData } = assetMetaData[index];
        if (!metaData) {
          console.warn(`no metadata found for ${asset.name}`);
          return [];
        }

        const originalBufferGeometry = getAssetBufferGeometry(
          initializedAssets[index]
        );

        return addAdditionalVerticies(bufferGeometry, originalBufferGeometry);
      }
      console.warn(`no buffer geometry found for ${asset.name}`);
      return [];
    });
    transformedGeometry.forEach(async (transformed, index) => {
      const fileName = initializedAssets[index].name;
      const geometryId = initializedAssets[index].id;
      await handleExportClick(transformed, geometryId, fileName);
    });
  }, [initializedAssets]);

  const extractAssetMetadata = () => {
    const updatedAssetData = extractMetadata(initializedAssets);
    downloadJsonFile(updatedAssetData, `asset-data`);
  };

  const formatToSpec = useCallback(() => {
    const preTransformed = preTransformGeometry(
      initializedAssets,
      preTranformConfig
    );
    const assetMetaData = extractMetadata(preTransformed);
    const transformedGeometry = preTransformed.flatMap((asset, index) => {
      const bufferGeometry = getAssetBufferGeometry(asset);
      if (bufferGeometry) {
        const { metaData } = assetMetaData[index];
        if (!metaData) {
          console.warn(`no metadata found for ${asset.name}`);
          return [];
        }
        return getAssetBufferGeometry(initializedAssets[index]);
      }
      console.warn(`no buffer geometry found for ${asset.name}`);
      return [];
    });
    transformedGeometry.forEach(async (transformed, index) => {
      const fileName = initializedAssets[index].name;
      const geometryId = initializedAssets[index].id;
      await handleExportClick(transformed, geometryId, fileName);
    });
  }, [initializedAssets]);

  // const getEdges = () => {
  //   initializedAssets.forEach((asset) => {
  //     const bufferGeometry = getAssetBufferGeometry(asset);
  //     if (bufferGeometry) {
  //       const edges = getEdgesGeometry(bufferGeometry);
  //       const fileName = asset.name;
  //       const asObj3d = new Mesh(edges);
  //       asObj3d.name = asset.id;
  //       //  handleExportClick(asObj3d, fileName);
  //     }
  //   });
  // };

  // const subDivide = () => {
  //   initializedAssets.forEach((asset) => {
  //     const bufferGeometry = getAssetBufferGeometry(asset);
  //     if (bufferGeometry) {
  //       const subdivided = subdivideByVertexDistance(bufferGeometry);
  //       const fileName = asset.name;
  //       const asObj3d = new Mesh(subdivided);
  //       asObj3d.name = asset.id;
  //       //  handleExportClick(asObj3d, fileName);
  //     }
  //   });
  // };

  return (
    <AppContainer>
      <Container>
        <h1>Geometry Preprocess</h1>
        <h1>Assets Initialized : {areAssetsInitialized ? "yes" : "no"} </h1>
        <h1>Assets : {initializedAssets.map(({ name }) => `${name} `)} </h1>
        <h2>Same Vertices</h2>
        <button
          type="button"
          onClick={sameVertices}
          disabled={!areAssetsInitialized}
        >
          Same Vertices
        </button>
        <button
          type="button"
          onClick={formatToSpec}
          disabled={!areAssetsInitialized}
        >
          Format To Spec
        </button>
        <button
          type="button"
          onClick={addVertices}
          disabled={!areAssetsInitialized}
        >
          add Vertices
        </button>
        <h2>Extract Metadata</h2>
        <button
          type="button"
          onClick={extractAssetMetadata}
          disabled={!areAssetsInitialized}
        >
          Extract Metadata
        </button>
      </Container>
    </AppContainer>
  );
};
