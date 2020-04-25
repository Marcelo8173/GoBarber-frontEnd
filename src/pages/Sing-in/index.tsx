import React from 'react';
import {Container, Content, Background} from './styled';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';

import Input from '../../components/input/input';
import Button from '../../components/button/index'

const SigIn: React.FC = () => {
    return(
        <Container>
            <Content>
                <img src={LogoGoBarber} alt="Logo GoBarber"/>
                <form>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                    <Button type="submit">Entrar</Button>

                    <a href="http://">Esqueci minha senha</a>
                </form>

                <a href="/">
                    <FiLogIn/>
                    Criar conta</a>
            </Content>

            <Background/>
        </Container>
    )
}

export default SigIn;