const mockPointDefinitions = [
  { id: "uTexture1", pointColor: "#ff1205" },
  { id: "uTexture2", pointColor: "#ff1005" },
];
const transformPointName = "mockPoint";
const mockPointColor = "";
describe("coordinateObjectToArray", () => {
  test("returns the default color if no point color is specified", () => {
    const result = getPointColor(transformPointName, []);
    expect(result).toEqual(`vec4 mockPoint =  vec4(1.0, 0.0, 0.0, opacity);`);
  });
  test("returns a parsed color if no point color is specified and parsed color is parsed", () => {
    const result = getPointColor(transformPointName, [], mockPointColor);
    expect(result).toEqual(
      `vec4 ${fragmentColorName} =  vec4(1.0, 0.0, 0.0, opacity);`
    );
  });
  test("returns specified colors based on the point type", () => {
    const result = getPointColor(
      transformPointName,
      mockPointDefinitions,
      mockPointColor
    );
    expect(result).toEqual(
      `vec4 ${fragmentColorName} =  vec4(1.0, 0.0, 0.0, opacity);`
    );
  });

  test("if there is no valid point color associated with the point definition it will return the default", () => {
    const updatedPointDefs = mockPointDefinitions.concat({
      id: "uTexture3",
      pointColor: "#rrrrrrrrr",
    });
    const result = getPointColor(
      transformPointName,
      updatedPointDefs,
      mockPointColor
    );
    expect(result).toEqual(
      `vec4 ${fragmentColorName} =  vec4(1.0, 0.0, 0.0, opacity);`
    );
  });
});
