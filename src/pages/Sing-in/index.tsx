import React from 'react';
import {Container, Content, Background} from './styled';
import {FiLogIn} from 'react-icons/fi';
import LogoGoBarber from '../../assets/logo.svg';

const SigIn: React.FC = () => {
    return(
        <Container>
            <Content>
                <img src={LogoGoBarber} alt="Logo GoBarber"/>
                <form>
                    <h1>Faça seu logon</h1>

                    <input placeholder="E-mail"/>
                    <input type="password" placeholder="Senha"/>
                    <button type="submit">Entrar</button>

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