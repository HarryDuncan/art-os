export const vertexFilterTransformation = (
  transformPointName: string,
  pointName: string
) => {
  return `
// FILTER
if(mod(pointIndex, uReduced) == 0.0){
    vec3 translated =  inverseRotate(${transformPointName});
    gl_PointSize = max(8.0, min(18.0, 18.0 *  (9.0 / translated.z)) );
  }else{
    gl_PointSize = 0.0;
  }
  if(vAffected == 1.0){
    gl_PointSize = 64.0;
  }
  vec3 ${pointName} = ${transformPointName};
`;
};
