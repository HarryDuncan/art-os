import { Asset } from "visual/set-up/assets/asset.types";
import { AttributeConfig } from "../../material/shaders/build-shader/types";

export const getAttributeValuesFromAssets = (
  attributeConfig: AttributeConfig[],
  assets: Asset[]
) =>
  attributeConfig.map((config) => {
    if (config.assetId) {
      const selectedAsset = assets.find((asset) => asset.id === config.assetId);
      if (selectedAsset) {
        const texture = selectedAsset.data;
        const { width, height } = texture.source.data;
        const numPoints = width * height;
        let threshold = 0;
        let originalColors;
        threshold = 40;
        const img = texture.image;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let numVisible = 0;
        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.scale(30, -30);
          ctx.drawImage(img, 0, 0, width, height * -30);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          originalColors = Float32Array.from(imgData.data);
          for (let i = 0; i < numPoints; i += 1) {
            if (originalColors[i * 4] > threshold) numVisible += 1;
          }
        }

        const indices = new Uint16Array(numVisible);
        const offsets = new Float32Array(numVisible * 3);
        const angles = new Float32Array(numVisible);

        for (let i = 0, j = 0; i < numVisible; i += 1) {
          if (originalColors[i * 4] > threshold) {
            offsets[j * 3 + 0] = i % width;
            offsets[j * 3 + 1] = Math.floor(i / width);
            indices[j] = i;
            angles[j] = Math.random() * Math.PI;
            j += 1;
          }
        }
        if (config.id === "pointOffset") {
          return {
            ...config,
            value: offsets,
          };
        }
        if (config.id === "pointIndex") {
          return {
            ...config,
            value: indices,
          };
        }
        return {
          ...config,
          attributeCount: numPoints,
        };
      }
    }
    return config;
  });

//     geometry.setAttribute(
//       "pindex",
//       new InstancedBufferAttribute(indices, 1, false)
//     );
//     geometry.setAttribute(
//       "offset",
//       new InstancedBufferAttribute(offsets, 3, false)
//     );
//     geometry.setAttribute(
//       "angle",
//       new InstancedBufferAttribute(angles, 1, false)
//     );

// }
