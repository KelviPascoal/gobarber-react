import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Container, Containt, Background } from "./styles";
import logoImg from '../../../assets/logo.svg';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useRef  } from "react";
import { useForm } from 'react-hook-form';
import { rulesEmail, rulesName, rulesPassword } from "../../../rules/formRules";

export const SignUp = () => {
    const formRef = useRef<FormHandles>(null)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = useCallback(async (data: object) => {
        console.log(data);
        
        // try {
        //     const schema = Yup.object().shape({
        //         name: Yup.string().required('Nome Obrigatorio'),
        //         email: Yup.string().required().email('E-mail obrigatorio'),
        //         password: Yup.string().min(6, 'Minimo 6 digitos'),
        //     });
        //     await schema.validate(data, {
        //         abortEarly: false
        //     })
        // } catch(err) {
        //         console.log({err});
                                
        // }
    }, []);

    return (
        <Container>
            <Background />
            <Containt>
                <img src={logoImg} alt="logo" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Faça seu cadastro</h1>
                    <Input register={register} name="name" icon={FiUser} placeholder="E-mail"  validation={rulesName} errors={errors.name} />
                    <Input register={register} name="email" icon={FiMail} placeholder="E-mail" validation={rulesEmail} errors={errors.email} />
                    <Input register={register} name="password" icon={FiLock} type="password" placeholder="Senha" validation={rulesPassword} errors={errors.password}  />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to="/"><FiArrowLeft /> voltar para login</Link>
            </Containt>
        </Container>
    );
}