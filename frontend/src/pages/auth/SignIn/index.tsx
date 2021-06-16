import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Container, Containt, Background } from "./styles";
import logoImg from '../../../assets/logo.svg';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { Form } from "@unform/web";

export const SignIn = () => {
    function handleSubmit(data: object) {
        console.log(data);
    }

    return (
        <Container>
            <Containt>
                <img src={logoImg} alt="logo" />
                <Form onSubmit={handleSubmit}>

                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>
                </Form>
                <a href="forgot ">Esqueci minha senha</a>
                <Link to="/cadastrar"><FiLogIn /> Criar conta</Link>
            </Containt>
            <Background />
        </Container>
    );
}