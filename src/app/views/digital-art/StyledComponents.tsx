import styled from 'styled-components/macro';
import { SIDE_BAR_WIDTH } from '../../components/navigation/side-bar/SideBar.styles';

export const DigitalArtContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  padding-left: ${SIDE_BAR_WIDTH};
  position: relative;
`;

export const DigitalArtHeader = styled.div`
  display: flex;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.mono.ui01};
`;
export const GalleryContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;
