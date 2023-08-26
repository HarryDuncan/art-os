import React, { useCallback } from "react";
import { useAssets } from "visual/set-up/assets/use-assets/useAssets";
import {
  maxVerticesCount,
  sameVerticiesCount,
} from "utils/model-editing/sameVerticiesCount";
import { Container } from "../views.styles";

import { transformGeometryVerticies } from "utils/model-editing/transformGeometryVerticies";
import { handleExportClick } from "./export/exportAsObj";
import { Mesh } from "three";
import { Asset } from "visual/set-up/assets/use-assets/types";

export const AssetEditor = () => {
  const assets = [
    {
      id: "art-geometry",
      name: "art-geometry",
      url: "../assets/models/website/home/art.obj",
      assetType: "GEOMETRY",
    },
    {
      id: "magic-geometry",
      name: "magic-geometry",
      url: "../assets/models/website/home/magic.obj",
      assetType: "GEOMETRY",
    },
    {
      id: "tech-geometry",
      name: "tech-geometry",
      url: "../assets/models/website/home/tech.obj",
      assetType: "GEOMETRY",
    },
  ];
  const { initializedAssets, areAssetsInitialized } = useAssets(
    assets as Asset[]
  );

  const sameVerticies = useCallback(() => {
    const geometries = initializedAssets.flatMap(({ data }) => {
      // @ts-ignore
      return data.children[0].geometry;
    });

    const maxVCount = maxVerticesCount(geometries);
    const transformedGeometry = geometries.map((geometry) => {
      return transformGeometryVerticies(geometry, maxVCount);
    });
    transformedGeometry.forEach((transformed, index) => {
      const fileName = initializedAssets[index].name;
      const asObj3d = new Mesh(transformed);
      asObj3d.name = initializedAssets[index].id;
      handleExportClick(asObj3d, fileName);
    });
  }, [initializedAssets]);
  return (
    <Container>
      <h1>Transform Geometry Assets </h1>
      <h1>Assets Initialized : {areAssetsInitialized ? "yes" : "no"} </h1>
      <h2>Same Verticies</h2>
      <button onClick={sameVerticies} disabled={!areAssetsInitialized}>
        Same Verticies
      </button>
    </Container>
  );
};
