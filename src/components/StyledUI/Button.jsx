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

export const BtnLanding = styled.button`
  border-width: 2px;
  border-radius: 10px;
  --tw-border-opacity: 1;
  border-color: rgb(35 42 78 / 0.2);
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: #232a4e;
`;
