export const formatMatcapTextureUniforms = (uniforms, matcapData) => ({
  ...uniforms,
  matcap: { value: matcapData },
});
