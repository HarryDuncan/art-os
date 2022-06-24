import { WebGLRenderer } from "three";

const MockRenderer = () => {
  return {};
};

export function mockRenderer() {
  return (WebGLRenderer as jest.Mock).mockImplementation(MockRenderer);
}
