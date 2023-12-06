import { expect, test } from "vitest";
import { formatMeshTransforms } from "../formatMeshTransforms";

const MOCK_TRANSFORM = [
  {
    type: "MORPH",
    transformedMeshIds: ["aphrodite-geometry", "apollo-geometry"],
    materialId: "morphing-material",
    attributeConfig: [
      {
        id: "randomBool",
        valueType: "FLOAT",
        valueConfig: { randomizedPercentage: 0.5 },
      },
      {
        id: "randomBool2",
        valueType: "FLOAT",
        valueConfig: { randomizedPercentage: 0.027 },
      },
    ],
  },
];
const MOCK_ATTRIBUTE_CONFIG = [
  {
    materialId: "morphing-material",
    attributeConfigs: [
      { id: "pointType", valueType: "FLOAT" },
      { id: "pointDisplay", valueType: "FLOAT" },
    ],
  },
];
test("merges attributes from the transform based on material id", () => {
  const formatted = formatMeshTransforms(MOCK_TRANSFORM, MOCK_ATTRIBUTE_CONFIG);
  expect(formatted).toEqual([
    {
      type: "MORPH",
      transformedMeshIds: ["aphrodite-geometry", "apollo-geometry"],
      materialId: "morphing-material",
      attributeConfig: [
        {
          id: "randomBool",
          valueType: "FLOAT",
          valueConfig: { randomizedPercentage: 0.5 },
        },
        {
          id: "randomBool2",
          valueType: "FLOAT",
          valueConfig: { randomizedPercentage: 0.027 },
        },
        { id: "pointType", valueType: "FLOAT" },
        { id: "pointDisplay", valueType: "FLOAT" },
      ],
    },
  ]);
});

test("adds mapped attributes to the transform based on material id", () => {
  const UPDATED_MOCK = [
    ...MOCK_TRANSFORM,
    {
      type: "MORPH",
      transformedMeshIds: ["aphrodite-geometry", "apollo-geometry"],
      materialId: "morphing-material2",
    },
  ];
  const updatedConfig = [
    { ...MOCK_ATTRIBUTE_CONFIG[0], materialId: "morphing-material2" },
  ];
  const formatted = formatMeshTransforms(UPDATED_MOCK, updatedConfig);
  expect(formatted).toEqual([
    {
      type: "MORPH",
      transformedMeshIds: ["aphrodite-geometry", "apollo-geometry"],
      materialId: "morphing-material",
      attributeConfig: [
        {
          id: "randomBool",
          valueType: "FLOAT",
          valueConfig: { randomizedPercentage: 0.5 },
        },
        {
          id: "randomBool2",
          valueType: "FLOAT",
          valueConfig: { randomizedPercentage: 0.027 },
        },
      ],
    },
    {
      type: "MORPH",
      transformedMeshIds: ["aphrodite-geometry", "apollo-geometry"],
      materialId: "morphing-material2",
      attributeConfig: [
        { id: "pointType", valueType: "FLOAT" },
        { id: "pointDisplay", valueType: "FLOAT" },
      ],
    },
  ]);
});
