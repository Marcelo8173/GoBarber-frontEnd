import React, {useRef, useCallback, useState} from 'react';
import {Container, Content, AnimationContainer, Background} from './styled';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import {FiLogIn, FiMail} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';
import Input from '../../components/input/input';
import Button from '../../components/button/index';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

interface ForgotPasswordData{
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();
    const history = useHistory();

    const HandleSubmit = useCallback(async(data: ForgotPasswordData) => {
        formRef.current?.setErrors({});
            try {
                //criando o loading
                setLoading(true);
                const schema = Yup.object().shape({
                    email: Yup.string().email().required('E-mail obrigatorio'),
                   
                });
    
                await schema.validate(data,{
                    abortEarly: false,
                });
                
                //recuperação de senha
                await api.post('/password/forgot',{
                    email: data.email
                })

                addToast({
                    title: 'Recuperação de senha',
                    description: 'E-mail de recuperação enviado, cheque sua caixa de entrada',
                    type: 'sucess',
                })
                // history.push('/painel_de_controle');

            } catch (error) {
                if(error instanceof Yup.ValidationError){
                    const erros = getValidationErros(error)
                    formRef.current?.setErrors(erros);

                    return;
                }
                //disparar um toast
                addToast({
                 type: 'error',
                 title: 'Erro na recuperação de senha',
                 description: 'Ocorreu um erro ao fazer a recuperação de senha, tenta novamente'
                });
            } finally{
                setLoading(false);
            }
        },[addToast, history]);

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={LogoGoBarber} alt="Logo GoBarber"/>
                    <Form ref={formRef} onSubmit={HandleSubmit}>
                        <h1>Recuperar senha</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        
                        <Button loading={loading} type="submit">Recuperar senha</Button>

                    </Form>

                    <Link to="/cadastrar">
                        <FiLogIn/>
                        Voltar ao login</Link>
                </AnimationContainer>
            </Content>

            <Background/>
        </Container>
    )
}

export default ForgotPassword;