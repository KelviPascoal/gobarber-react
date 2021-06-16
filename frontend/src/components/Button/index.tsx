import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    
}

export const Button = ({...rest}: Button) => (
    <Container>
        <button {...rest}/>
    </Container>
)