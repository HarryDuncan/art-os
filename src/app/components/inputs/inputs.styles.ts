import styled from "styled-components";

export const StyledInput = styled.input`
  box-shadow: none;
  border-style: none;
  flex: 1 1 0%;
  margin: 0px;
  font-size: 14px;
  font-family: inherit;
  color: rgb(50, 49, 48);
  background-color: rgb(255, 255, 255);
  height: 100%;
  padding: 0px 8px 0px 9px;
  outline: 0px;
  display: block;
  width: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: text;
  border-color: ${({ theme }) => theme.colors.mono.lightGray};
  border-radius: 5px;
  user-select: text;
  box-sizing: border-box;
`;
