import React from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logodireto.png';
import Input from '../../components/input';
import { FiMail, FiLock } from 'react-icons/fi';

const SignIn = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Dashboard Investidores"/>

            <form>
                <h1>Login</h1>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                <button type="submit">Entrar</button>
                <a href="forgot">Esqueci minha senha</a>
            </form>

            {/* <a href="login">Criar conta</a> */}
        </Content>
        <Background/>
    </Container>
);

export default SignIn;