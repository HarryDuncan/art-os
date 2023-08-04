import React, { useCallback } from "react";
import { useAssets } from "visual/set-up/assets/use-assets/useAssets";
import { sameVerticiesCount } from "utils/model-editing/sameVerticiesCount";
import { SandboxContainer } from "./sandbox.styles";

export function Sandbox() {
  const assets = [
    {
      id: "nymph-geometry",
      name: "nymph-geometry",
      url: "../assets/models/NymphFixed.obj",
      assetType: "GEOMETRY",
    },
    {
      id: "zeus-geometry",
      name: "zeus-geometry",
      url: "../assets/models/ZeusBust.obj",
      assetType: "GEOMETRY",
    },
  ];
  const { initializedAssets, areAssetsInitialized } = useAssets(assets);

  const sameVerticies = useCallback(() => {
    console.log(initializedAssets);

    const geometries = initializedAssets.flatMap(({ data }) => {
      console.log(data);
      return data.children[0].geometry;
    });
    sameVerticiesCount(geometries);
    console.log(geometries);
  }, [initializedAssets]);
  return (
    <SandboxContainer>
      <h1>hi</h1>
      <h1>Assets Initialized : {areAssetsInitialized ? "yes" : "no"} </h1>
      <button onClick={sameVerticies} disabled={!areAssetsInitialized}>
        Same Verticies
      </button>
    </SandboxContainer>
  );
}
