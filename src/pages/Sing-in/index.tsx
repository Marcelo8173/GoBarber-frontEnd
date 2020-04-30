import React, {useRef, useCallback} from 'react';
import {Container, Content, AnimationContainer, Background} from './styled';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';
import Input from '../../components/input/input';
import Button from '../../components/button/index';

import {useAuth} from '../../hooks/AuthContext';
import { useToast } from '../../hooks/Toast';

interface singInFormData{
    email: string;
    password: string;
}

const SigIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { singIn } = useAuth() ;
    const { addToast } = useToast();
    const history = useHistory();

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
                
                await singIn({
                    email: data.email,
                    password: data.password,
                });


                history.push('/painel_de_controle');

            } catch (error) {
                if(error instanceof Yup.ValidationError){
                    const erros = getValidationErros(error)
                    formRef.current?.setErrors(erros);
                }
                //disparar um toast
                addToast({
                 type: 'error',
                 title: 'Erro na autenticação',
                 description: 'Ocorreu um erro ao fazer login, reveja as credencias'
                });
            }
        },[singIn, addToast, history]);

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={LogoGoBarber} alt="Logo GoBarber"/>
                    <Form ref={formRef} onSubmit={HandleSubmit}>
                        <h1>Faça seu logon</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail"/>
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                        <Button type="submit">Entrar</Button>

                        <a href="http://">Esqueci minha senha</a>
                    </Form>

                    <Link to="/cadastrar">
                        <FiLogIn/>
                        Criar conta</Link>
                </AnimationContainer>
            </Content>

            <Background/>
        </Container>
    )
}

export default SigIn;