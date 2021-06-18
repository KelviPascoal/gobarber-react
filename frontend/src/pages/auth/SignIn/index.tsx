import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Container, Containt, Background } from "./styles";
import logoImg from '../../../assets/logo.svg';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import { useForm } from "react-hook-form";
import { rulesEmail, rulesName, rulesPassword } from "../../../rules/formRules";

export const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    function onSubmit(data: object) {
        console.log(data);
    }

    return (
        <Container>
            <Containt>
                <img src={logoImg} alt="logo" />
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <h1>Faça seu logon</h1>
                    <Input register={register} name="email" icon={FiMail} placeholder="E-mail" validation={rulesEmail} errors={errors.email} />
                    <Input register={register} name="password" icon={FiLock} type="password" placeholder="Senha" validation={rulesPassword} errors={errors.password}  />
                    <Button type="submit">Entrar</Button>
                </Form>
                <a href="forgot ">Esqueci minha senha</a>
                <Link to="/cadastrar"><FiLogIn /> Criar conta</Link>
            </Containt>
            <Background />
        </Container>
    );
}