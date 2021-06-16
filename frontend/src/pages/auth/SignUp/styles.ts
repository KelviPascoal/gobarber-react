import { shade } from "polished";
import styled from "styled-components";
import signUpBackgroundImg from "../../../assets/sign-up-background-img.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;

  img {
    height: 100px;
  }
`;

export const Containt = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }
  h1 {
    margin-bottom: 24px;
  }

  a {
    color: #f4ede8;
    margin-top: 16px;
    text-decoration: none;
    font-size: 10px;
    transition: color 0.2s;

    display: flex;
    align-items: center;
    
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#F4EDE8")};
    }
  }
  
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
