import { useCallback } from "react";
import { Container } from "../views.styles";
import { handleExportClick } from "./export/exportAsObj";
import { CONFIG } from "app/constants";
import { useFetchData } from "app/hooks/useFetchData";
import { extractMetadata } from "./geometry/extract-metadata/extractMetadata";
import { downloadJsonFile } from "./export/downloadJson";
import { Asset } from "visual/set-up/assets/asset.types";
import { getAssetBufferGeometry } from "visual/set-up/config/mesh/geometry/getAssetGeometries";
import { useAssets } from "visual/set-up/assets/useAssets";
import { setSameVertexCount } from "./geometry/vertex/setSameVertexCount";
import { addAdditionalVerticies } from "./geometry/vertex/add-shapes/addAdditionalVertices";
import { preTransformGeometry } from "./pre-transform/preTransform";
// import { getEdgesGeometry } from "./geometry/edges-geometry/getEdgesGeometry";
// import {
//   AXIS,
//   Axis,
// } from "visual/utils/three-dimension-space/position/position.types";
// import { subdivideByVertexDistance } from "./geometry/vertex/subdivide/subdivideByVertexDistance";

const preTranformConfig = {
  centerGeometry: true,
};
export const GeometryPreprocess = () => {
  const assets = useFetchData(`${CONFIG}assets/rbg.json`);
  const { initializedAssets, areAssetsInitialized } = useAssets(
    assets as Asset[]
  );

  // const transformConfig = {
  //   vertexPositionsCount: 1,
  //   vertexPositionAxis: AXIS.X as Axis,
  // };
  // const centerToOrigin = () => {
  //   const preTransformed = preTransform(initializedAssets, preTranformConfig);
  //   const transformedGeometry = preTransformed.flatMap((asset) => {
  //     const bufferGeometry = getAssetBufferGeometry(asset);
  //     return bufferGeometry ?? [];
  //   });
  //   transformedGeometry.forEach((transformed, index) => {
  //     const fileName = initializedAssets[index].name;
  //     const asObj3d = new Mesh(transformed);
  //     asObj3d.name = initializedAssets[index].id;
  //     // handleExportClick(asObj3d, fileName);
  //   });
  // };
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
  );
};
