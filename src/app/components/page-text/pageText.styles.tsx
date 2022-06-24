import styled from "styled-components";

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.mono.ui01};
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`;
