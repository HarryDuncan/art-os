import React from 'react';
import { Root } from './RootContainer.styles';

interface IRootContainerProps {
  containerRef: React.MutableRefObject<any>;
  children?: React.ReactNode;
  viewWidth?: string;
  viewHeight?: string;
}
// Scene manager for displaying multiple scenes in a particular setting
export function RootContainer({
  containerRef,
  viewWidth = '100vw',
  viewHeight = '100vh',
}: IRootContainerProps) {
  return <Root $height={viewHeight} $width={viewWidth} ref={containerRef} />;
}
