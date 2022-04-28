import styled from 'styled-components/macro';
import { SVGProps, DetailedHTMLProps, HTMLAttributes } from 'react';
import { AssetType, AssetValue, icons } from './Assets';

type IconLibrary = Record<AssetType, TIcon>;
type ElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & SVGProps<SVGSVGElement>;

export type TIcon = ReturnType<typeof getStyledIcon>;

export const Icon = Object.entries(icons).reduce<IconLibrary>(
  (accumulator, [iconName, Icon]) => ({
    ...accumulator,
    [iconName]: getStyledIcon(Icon),
  }),
  {} as IconLibrary
);

function getStyledIcon(Icon: AssetValue) {
  return styled(Icon)<{ width?: string; height?: string } & ElementProps>`
    display: inline-block;
    width: ${({ width }) => width ?? `1em`};
    height: ${({ height }) => height ?? `1em`};
    &:not([fill='none']) {
      fill: currentColor;
    }
  `;
}
