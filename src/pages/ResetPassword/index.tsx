import React, {useRef, useCallback} from 'react';
import {Container, Content, AnimationContainer, Background} from './styled';
import {useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import { FiLock} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';
import Input from '../../components/input/input';
import Button from '../../components/button/index';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

interface ResetPasswordFormData{
    password_confirmation: string;
    password: string;
}

const SigIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const location = useLocation();
    console.log(location)
    const history = useHistory();

    const HandleSubmit = useCallback(async(data: ResetPasswordFormData) => {
        formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatoria'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Confirmação incorreta',
                    )
                });
    
                await schema.validate(data,{
                    abortEarly: false,
                });
                //reset da senha
                const token = location.search.replace('?token=', '');
                //caso o token não exista
                if(!token){
                    addToast({
                        title: 'Erro ao resetar senha',
                        description: 'Erro ao resetar a senha, tente novamente',
                        type: 'error',
                    });

                    return;
                }

                await api.post('/password/reset', {
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    token,
                })

                history.push('/');

            } catch (error) {
                if(error instanceof Yup.ValidationError){
                    const erros = getValidationErros(error)
                    formRef.current?.setErrors(erros);
                }
                //disparar um toast
                addToast({
                 type: 'error',
                 title: 'Erro ao resetar sua senha',
                 description: 'Ocorreu um erro ao resetar sua senha, tente novamente'
                });
            }
        },[addToast, history, location.search]);

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={LogoGoBarber} alt="Logo GoBarber"/>
                    <Form ref={formRef} onSubmit={HandleSubmit}>
                        <h1>Resetar senha</h1>

                        <Input name="password" icon={FiLock} type="password" placeholder="Nova senha"/>
                        <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmação da senha"/>

                        <Button type="submit">Alterar senha</Button>

                    </Form>

                </AnimationContainer>
            </Content>

            <Background/>
        </Container>
    )
}

export default SigIn;