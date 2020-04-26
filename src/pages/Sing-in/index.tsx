import React, {useRef, useCallback} from 'react';
import {Container, Content, Background} from './styled';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';
import Input from '../../components/input/input';
import Button from '../../components/button/index';

import {useAuth} from '../../hooks/AuthContext';

interface singInFormData{
    email: string;
    password: string;
}

const SigIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { singIn } = useAuth() ;


    const HandleSubmit = useCallback(async(data: singInFormData) => {
        formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    email: Yup.string().email().required('E-mail obrigatorio'),
                    password: Yup.string().required('Senha obrigatoria'),
                });
    
                await schema.validate(data,{
                    abortEarly: false,
                });
                
                singIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (error) {
                const erros = getValidationErros(error)
                formRef.current?.setErrors(erros);
            }
        },[singIn]);

    return(
        <Container>
            <Content>
                <img src={LogoGoBarber} alt="Logo GoBarber"/>
                <Form ref={formRef} onSubmit={HandleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                    <Button type="submit">Entrar</Button>

                    <a href="http://">Esqueci minha senha</a>
                </Form>

                <a href="/">
                    <FiLogIn/>
                    Criar conta</a>
            </Content>

            <Background/>
        </Container>
    )
}

export default SigIn;