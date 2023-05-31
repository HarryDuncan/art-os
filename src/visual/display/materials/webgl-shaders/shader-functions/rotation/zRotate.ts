export const zRotate = `
    mat4 zRotate(float time){
        float angle = time * 0.2;
        float c = cos(angle);
        float s = sin(angle);
          
        return mat4(
            vec4(c, s, 0.0, 0.0),
            vec4(-s, c, 0.0, 0.0),
            vec4(0.0, 0.0, 1.0, 0.0),
            vec4(0.0, 0.0, 0.0, 1.0)
        );
    }
`;

export const xRotate = `
mat4 xRotate(float time){
    float angle = time * 0.2;
    float c = cos(angle);
    float s = sin(angle);

    return mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, c, s, 0.0),
    vec4(0.0, -s, c, 0.0),
    vec4(0.0, 0.0, 0.0, 1.0)
    );
}
`;
