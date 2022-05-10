export const addShaders = (shaders: string[]) => {
  let formattedShader = ``;

  let includedFunctions: string[] = [];
  shaders.forEach((shader) => {
    const allFunctionsInShader = shader
      .split("// **-")
      .filter(
        (shaderFunction: string) => !includedFunctions.includes(shaderFunction)
      );
    console.log(allFunctionsInShader);

    includedFunctions = includedFunctions.concat(allFunctionsInShader);

    allFunctionsInShader.forEach((functionStr: string) => {
      formattedShader += functionStr;
    });
  });
  return formattedShader;
};
