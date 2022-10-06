import styled from "@emotion/styled";

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
  color: #d3d3d3;
  cursor: pointer;
  z-index: 900;
  &:hover {
    color: black;
    background-color: var(--text);
  }
`;
