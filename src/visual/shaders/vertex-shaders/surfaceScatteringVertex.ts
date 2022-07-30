export const surfaceScatteringVertex = {
  vert: `attribute float size;
    attribute vec3 color;
    attribute float fade;

    varying vec3 vColor;

    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size;
        gl_Position = projectionMatrix * mvPosition;
    }`,
};
