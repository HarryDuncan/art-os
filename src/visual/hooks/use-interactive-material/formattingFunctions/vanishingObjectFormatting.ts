import { Vector3 } from "three";
import { getGeometryFromAsset } from "visual/helpers/assets/getGeometryFromAsset";

export const vanishingObjectFormatting = (
  assets,
  uniforms
): { geometry; uniforms } => {
  const geom = getGeometryFromAsset(assets);
  const matcap = assets.find((asset) => asset.name === "matcap").data;
  uniforms.matcap.value = matcap;
  const geometry = geom.clone();
  geometry.computeBoundingBox();
  const size = new Vector3();
  geometry.boundingBox.getSize(size);
  uniforms.size.value.copy(size);

  return { geometry, uniforms };
};
