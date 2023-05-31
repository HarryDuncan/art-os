export const formatAssetToUniform = (assets, uniforms) => {
  assets.forEach((asset) => {
    if (uniforms[asset.name] && asset.data) {
      uniforms[asset.name].value = asset.data;
    } else {
      console.warn(`Asset ${asset.name} not associated with a a uniform`);
    }
  });
  return uniforms;
};
