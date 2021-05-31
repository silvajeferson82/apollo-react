import React from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo-pague-direto.png';
// import { FiLogin } from 'react-icons';

const SignIn = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Dashboard Investidores"/>

            <form>
                <h1>Login</h1>
                <input placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <button type="submit">Entrar</button>
                <a href="forgot">Esqueci minha senha</a>
            </form>

            {/* <a href="login">Criar conta</a> */}
        </Content>
        <Background/>
    </Container>
);

export default SignIn;