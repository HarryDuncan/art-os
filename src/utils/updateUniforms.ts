export const updateUniforms = (uniforms, newValues: object) => {
  const vals = Object.entries(newValues);
  const newUniformValues = vals.reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key as string]: { type: uniforms[key].type, value: value },
    };
  }, {});
  return { ...uniforms, ...newUniformValues };
};
