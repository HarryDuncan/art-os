import React from "react";
import styled from "styled-components";

// Styled components
const SpinButtonContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  height: 32px;
  min-width: 86px;
  border-color: rgb(96, 94, 92);
  border: 1px solid;
`;

const ButtonContainer = styled.span`
  display: block;
  height: 100%;
  cursor: default;
`;

const Button = styled.button`
  background-color: #ffffff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 8px;
  margin: 0px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  flex-shrink: 0;
`;
const Input = styled.input`
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
  border-radius: 2px 0px 0px 2px;
  user-select: text;
  box-sizing: border-box;
`;

interface SpinButtonProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
}

const ChevronUpIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24">
    <path d="M7 14l5-5 5 5z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export const SpinButton = ({ value, onChange, max, min }: SpinButtonProps) => {
  const increment = () => {
    if (!max || value + 1 < max) {
      onChange(value + 1);
    }
  };
  const decrement = () => {
    if (min === undefined || value + 1 < min) {
      onChange(value - 1);
    }
  };

  return (
    <SpinButtonContainer>
      <Input type="text" value={value} readOnly />
      <ButtonContainer>
        <Button onClick={increment}>
          <ChevronUpIcon />
        </Button>
        <Button onClick={decrement}>
          <ChevronDownIcon />
        </Button>
      </ButtonContainer>
    </SpinButtonContainer>
  );
};
