export const rotateModel = (positionName: string, rotationSpeed: string) =>
  `vec4 rotateModel(vec3 position, float speed){
        float angle = uTime * ${rotationSpeed}; // calculate the angle based on time
        mat4 rotationMatrix = mat4(
          vec4(cos(angle), 0, sin(angle), 0),
          vec4(0, 1, 0, 0),
          vec4(-sin(angle), 0, cos(angle), 0),
          vec4(0, 0, 0, 1)
        ); // create a rotation matrix around y-axis
        vec4 rotatedPosition = vec4(new_position,1.0) * rotationMatrix; // rotate position
        }
        vec4 rotatedPosition =  rotateModel(${positionName}, ${String(
    rotationSpeed
  )};`;
