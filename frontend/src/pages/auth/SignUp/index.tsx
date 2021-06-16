import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Container, Containt, Background } from "./styles";
import logoImg from '../../../assets/logo.svg';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { Form } from '@unform/web';

export const SignUp = () => {
    function handleSubmit(data: object) {
        console.log(data);
    }

    return (
        <Container>
            <Background />
            <Containt>
                <img src={logoImg} alt="logo" />
                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="E-mail" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to="/"><FiArrowLeft /> voltar para login</Link>
            </Containt>
        </Container>
    );
}