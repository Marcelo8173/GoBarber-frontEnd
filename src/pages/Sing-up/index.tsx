import React, {useCallback, useRef} from 'react';
import {FormHandles} from '@unform/core';
import {Container, Content, AnimationContainer ,Background} from './styled';
import { Link } from 'react-router-dom';
import {FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/input/input';
import Button from '../../components/button/index'
import getValidationErros from '../../utils/getValidationErros';


const SingUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

   const HandleSubmit = useCallback(async(data: object) => {
    formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatorio'),
                email: Yup.string().email().required('Email obrigatorio'),
                password: Yup.string().min(6, 'No minimo 6 letras'),
            });

            await schema.validate(data,{
                abortEarly: false,
            });

        } catch (error) {
            const erros = getValidationErros(error)
            formRef.current?.setErrors(erros);
        }
    },[])


    return(
        <Container>
            <Background/>
            <Content>
                <AnimationContainer>
                    <img src={LogoGoBarber} alt="Logo GoBarber"/>
                    <Form ref={formRef} onSubmit={HandleSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input name="name" icon={FiUser} placeholder="Nome"/>
                        <Input name="email" icon={FiMail} placeholder="E-mail"/>
                        <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>

                        <Button type="submit">Cadastrar</Button>

                    </Form>

                    <Link to="/">
                        <FiArrowLeft/>
                        Voltar para Logon</Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default SingUp;