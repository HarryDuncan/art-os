import styled, { keyframes } from 'styled-components';

export const CardTitle = styled.h2`
  color: rgba(237, 235, 233, 0);
  position: absolute;
  z-index: 40;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.05em;
  font-size: 2em;
  margin-left: 20px;
  font-weight: 400;
  top: 0;
  pointer-events: none;
  &: hover {
  }
`;

export const CardFooter = styled.div``;

const showTitle = keyframes`
0% {
}
100% {
  color: rgba(237, 235, 233, 1);
}
`;

export const CardWrapper = styled.div`
  box-sizing: inherit;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: 30%;
  flex: 1 0 22%;
  background-color: transparent !important;
  padding-bottom: -4%;
  -webkit-box-shadow: 15px 15px 16px #ccc; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 15px 15px 16px #ccc; /* Firefox 3.5 - 3.6 */
  box-shadow: 15px 15px 16px #ccc;
  cursor: pointer;
  margin-bottom: 30px;
  margin-right: 1rem;
  &:hover {
    ${CardTitle} {
      animation: ${showTitle} 500ms 1 forwards;
    }
  }
`;

export const CardImage = styled.img`
  object-fit: contain;
  width: 100%;
  min-height: 100px;
  vertical-align: middle;
  &: hover {
    filter: brightness(30%);
    animation-timing-function: ease-in-out;

    -webkit-animation: showTitle 500ms 1 forwards;
  }
`;
