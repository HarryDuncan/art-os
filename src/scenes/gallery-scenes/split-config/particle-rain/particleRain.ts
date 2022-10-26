import { AssetType } from "visual/hooks/use-assets/types";
import { formatParticles } from "./formatFunction/formatParticles";
import { materialParams as particleRainMaterialParams } from "./particleRainMaterialParams";
import { sceneFunctions } from "./sceneFunctions";

export const particleRain = () => ({
  materialParams: particleRainMaterialParams,
  formattingFunction: formatParticles,
  sceneFunctions,
  threeJsParams: {
    camera: {
      position: { x: 150, y: 150, z: 750 },
    },
  },
  assets: [
    {
      name: "uTexture",
      url: "../assets/textures/12.jpg",
      assetType: AssetType.Image,
    },
  ],
});