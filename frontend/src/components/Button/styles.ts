import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  button {
    margin-top: 16px;
    height: 56px;
    border-radius: 10px;
    border: 0;
    background-color: #ff9000;
    color: #312e38;
    padding: 0 16px;
    width: 100%;
    transition: background-color 0.2s;
    font-size: 16px;
    font-weight: 500;

    &:hover {
      background: ${shade(0.2, "#FF9000")};
    }
  }
`;
