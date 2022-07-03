// @ts-nocheck
import { useMemo } from "react";
import {
  BufferAttribute,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Object3D,
  Vector2,
} from "three";
import {
  InteractiveMaterialFunctions,
  InteractiveParam,
} from "visual/components/interactive-material/types";
import TouchTexture from "visual/visual-components/interactive-particles/TouchTexture";
import { Asset } from "../use-assets/types";
import { InteractionEventObject } from "../use-interactions/types";
import { useCreateInteractiveMesh } from "../use-interactive-material/useCreateInteractiveMesh";
import { useTextureFeature } from "./useTextureFeature";

export const useInteractiveParticles = (
  materialParams: InteractiveParam,
  interactionEvents: InteractionEventObject[],
  areAssetsInitialized: boolean,
  assets: Asset[],
  materialFunctions: InteractiveMaterialFunctions
) => {
  const getTextures = useTextureFeature();
  const createMesh = useCreateInteractiveMesh();

  // Interactive mesh must be created after assets are loaded - in case we use any geometries/textures
  const interactiveParticleMesh = useMemo(() => {
    // TODO - error handling if no assets
    if (!areAssetsInitialized) return;
    if (!assets.length) return;
    const loadedTextures = getTextures(assets);

    const { uniforms, shaders } = materialParams;
    const { geometry, formattedUniforms } = formatGeometry(
      loadedTextures[0],
      uniforms
    );

    const interactiveMesh = createMesh(
      interactionEvents,
      //@ts-ignore
      geometry,
      formattedUniforms,
      shaders,
      materialFunctions
    );
    const container = new Object3D();
    container.add(interactiveMesh);

    return container;
  }, [
    areAssetsInitialized,
    assets,
    interactionEvents,
    materialParams,
    materialFunctions,
    getTextures,
    createMesh,
  ]);

  return interactiveParticleMesh;
};

const formatGeometry = (loadedTexture, uniforms) => {
  const touch = new TouchTexture();
  const geometry = new InstancedBufferGeometry();

  // positions
  const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
  positions.setXYZ(0, -1, 1, 0.0);
  positions.setXYZ(1, 1, 1, 0.0);
  positions.setXYZ(2, -1, -1, 0.0);
  positions.setXYZ(3, 1, -1, 0.0);
  geometry.setAttribute("position", positions);

  // uvs
  const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
  uvs.setXYZ(0, 0.0, 0.0);
  uvs.setXYZ(1, 1.0, 0.0);
  uvs.setXYZ(2, 0.0, 1.0);
  uvs.setXYZ(3, 1.0, 1.0);
  geometry.setAttribute("uv", uvs);

  // index
  geometry.setIndex(
    new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
  );

  const { numPoints, width, height } = loadedTexture;

  let threshold = 0;
  let originalColors;

  threshold = 40;

  const img = loadedTexture.texture.image;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let numVisible = 0;
  canvas.width = width;
  canvas.height = height;
  if (ctx) {
    ctx.scale(10, -10);
    ctx.drawImage(img, 0, 0, width, height * -10);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    originalColors = Float32Array.from(imgData.data);
    for (let i = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] > threshold) numVisible++;
    }
  }

  const indices = new Uint16Array(numVisible);
  const offsets = new Float32Array(numVisible * 3);
  const angles = new Float32Array(numVisible);

  for (let i = 0, j = 0; i < numVisible; i++) {
    if (originalColors[i * 4 + 0] <= threshold) {
      continue;
    } else {
      offsets[j * 3 + 0] = i % width;
      offsets[j * 3 + 1] = Math.floor(i / width);
      indices[j] = i;
      angles[j] = Math.random() * Math.PI;
      j++;
    }
  }

  geometry.setAttribute(
    "pindex",
    new InstancedBufferAttribute(indices, 1, false)
  );
  geometry.setAttribute(
    "offset",
    new InstancedBufferAttribute(offsets, 3, false)
  );
  geometry.setAttribute(
    "angle",
    new InstancedBufferAttribute(angles, 1, false)
  );

  uniforms.uTextureSize.value = new Vector2(width, height);
  uniforms.uTexture.value = loadedTexture.texture;
  uniforms.uTouch.value = touch.texture;
  uniforms.uTouchRef.value = touch;

  return { geometry, formattedUniforms: uniforms };
};
