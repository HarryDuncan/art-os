import { useMemo } from 'react';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { getRendererSize } from '../helpers/getRendererSize';
import { DEFAULT_RENDERER_PARAMS } from '../rendererConstants';
import { RendererParams, RendererTypes } from '../types';

export const useCssRenderer = (
  rendererParams: RendererParams = DEFAULT_RENDERER_PARAMS,
) => useMemo(() => {
  if (rendererParams.rendererType === RendererTypes.CSS) {
    const renderer = new CSS3DRenderer();
    const { width, height } = getRendererSize(rendererParams);
    renderer.setSize(width, height);
    return renderer;
  }
}, [rendererParams]);
