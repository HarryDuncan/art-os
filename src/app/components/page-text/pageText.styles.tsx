import styled from "styled-components";

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.mono.darkText};
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`;
