import { createKeyName } from "../utils";
import { CubeTextureLoader, TextureLoader } from "three";
import { ITextureProp } from "../interfaces";

const getCubeUrls = (url: string, fileFormat: string) => [
  // Middle Right
  `${url}px.${fileFormat}`,
  // Middle Left
  `${url}nx.${fileFormat}`,
  // Top Middle
  `${url}py.${fileFormat}`,
  // Bottom Middle
  `${url}ny.${fileFormat}`,

  // Middle Middle
  `${url}pz.${fileFormat}`,
  `../images/textures/cube/nz.${fileFormat}`,
];

export const setUpReflectionEnvMap = (
  url: string,
  fileFormat: string,
  textureLoader: any = new CubeTextureLoader()
) => {
  const urls = getCubeUrls(url, fileFormat);
  const reflectionCube = textureLoader.load(urls);

  return reflectionCube;
};

export const setUpRefractionEnvMap = (
  url: string,
  fileFormat: string,
  textureLoader: any = new CubeTextureLoader()
) => {
  const urls = getCubeUrls(url, fileFormat);
  const refractionCube = textureLoader.load(urls);
  return refractionCube;
};

export const fitTextureToPlane = (
  texture: any,
  viewportWidth: number,
  viewportHeight: number
) => {
  texture.matrixAutoUpdate = false;

  var aspect = viewportWidth / viewportHeight;
  var imageAspect = texture.image.width / texture.image.height;

  if (aspect < imageAspect) {
    texture.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5);
  } else {
    texture.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5);
  }

  return texture;
};

export const loadTexturePromise = (textureProps: ITextureProp) =>
  new Promise((resolve, reject) => {
    const loadedTexture = new TextureLoader().load(
      textureProps.path,
      (onLoad) => {
        resolve(loadedTexture);
      },

      (onError) => {
        console.error("error loading texture");
        reject("error");
      }
    );
  });
export const loadTextureProps = (textures: ITextureProp[]): any =>
  new Promise((resolve, reject) => {
    const loadedTextures: any = {};
    let errorCount = 0;
    textures.forEach((texture: ITextureProp) => {
      loadTexturePromise(texture)
        .then((response) => {
          loadedTextures[
            `${createKeyName("texture", loadedTextures, texture.name)}`
          ] = response;
          if (
            Object.keys(loadedTextures).length + errorCount ===
            textures.length
          ) {
            resolve(loadedTextures);
          }
        })
        .catch(() => {
          errorCount++;
          if (errorCount === textures.length) {
            reject({});
          } else if (
            Object.keys(loadedTextures).length + errorCount ===
            textures.length
          ) {
            resolve(loadedTextures);
          }
        });
    });
  });
