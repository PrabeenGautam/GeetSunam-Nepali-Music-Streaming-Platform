import styled from "styled-components";

export const Btn = styled.button`
  padding: 10px;
  border: none;
  min-width: 95px;
  height: 40px;
  border-radius: 4px;
  font-family: "Roboto";
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: var(--text);
  cursor: pointer;
  z-index: 999;
  &:hover {
    background: var(--tertiary);
    color: black;
  }
`;
