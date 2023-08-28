import React, { useCallback } from "react";
import { useAssets } from "visual/set-up/assets/use-assets/useAssets";
import { Container } from "../views.styles";
import { transformGeometryVerticies } from "utils/asset-editing/transformGeometryVerticies";
import { handleExportClick } from "./export/exportAsObj";
import { Mesh } from "three";
import { CONFIG } from "app/constants";
import { useFetchData } from "app/hooks/useFetchData";
import { extractMetadata } from "./extract-metadata/extractMetadata";
import { downloadJsonFile } from "./downloadJson";
import { Asset } from "visual/set-up/assets/asset.types";
import { getAssetBufferGeometry } from "visual/set-up/config/mesh/geometry/getAssetGeometries";

export const AssetEditor = () => {
  const assets = useFetchData(`${CONFIG}assets/assets.json`);
  const { initializedAssets, areAssetsInitialized } = useAssets(
    assets as Asset[]
  );

  const transformConfig = {
    extraVertexPoints: 8,
  };
  const sameVerticies = useCallback(() => {
    const assetMetaData = extractMetadata(initializedAssets);

    const maxVertexCount = Math.max(
      ...assetMetaData.map(({ metaData }) => metaData?.vertexCount ?? 0)
    );
    const transformedGeometry = initializedAssets.flatMap((asset, index) => {
      const bufferGeometry = getAssetBufferGeometry(asset);
      if (bufferGeometry) {
        const { metaData } = assetMetaData[index];
        if (!metaData) {
          console.warn(`no metadata found for ${asset.name}`);
          return [];
        }
        return transformGeometryVerticies(
          bufferGeometry,
          maxVertexCount,
          metaData,
          transformConfig
        );
      }
      console.warn(`no buffer geometry found for ${asset.name}`);
      return [];
    });
    transformedGeometry.forEach((transformed, index) => {
      const fileName = initializedAssets[index].name;
      const asObj3d = new Mesh(transformed);
      asObj3d.name = initializedAssets[index].id;
      handleExportClick(asObj3d, fileName);
    });
  }, [initializedAssets]);

  const extractAssetMetadata = () => {
    const updatedAssetData = extractMetadata(initializedAssets);
    downloadJsonFile(updatedAssetData, `asset-data`);
  };

  return (
    <Container>
      <h1>Transform Geometry Assets </h1>
      <h1>Assets Initialized : {areAssetsInitialized ? "yes" : "no"} </h1>
      <h1>Assets : {initializedAssets.map(({ name }) => `${name} `)} </h1>
      <h2>Same Verticies</h2>
      <button onClick={sameVerticies} disabled={!areAssetsInitialized}>
        Same Verticies
      </button>
      <h2>Extract Metadata</h2>
      <button onClick={extractAssetMetadata} disabled={!areAssetsInitialized}>
        Extract Metadata
      </button>
    </Container>
  );
};
