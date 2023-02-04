import styled from "@emotion/styled";

export const Btn = styled.button`
  padding: 10px 20px;
  border: none;
  width: fit-content;
  height: 40px;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  letter-spacing: 0.05rem;
  line-height: 18px;
  cursor: pointer;
  z-index: 900;
  color: #d3d3d3;
  &:hover {
    color: black;
    background-color: var(--text);
  }
`;
