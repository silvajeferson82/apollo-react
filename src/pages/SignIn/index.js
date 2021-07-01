import React, { useRef, useCallback } from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logodireto.png';
import { Form } from '@unform/web';
import api from '../../service/api';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';

const SignIn = () => {
    const history = useHistory();
    const formRef = useRef(null);

    const handleSubmit = useCallback(async (element) => {
        try {
            const { data } = await api.post('/usuarioLogin', { 
                    usuario: element.profileObj.email
            }); 
            
            localStorage.setItem('isAuthenticated', window.btoa(JSON.stringify(data)));
            localStorage.setItem('userData', window.btoa(JSON.stringify(element.profileObj)))
            
            if (data) {
                history.push('/home');               
            } 
        } catch (error) {
            console.log(error);
            toast.error('you do not have permission to access the platform');
        }
    }, []);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Dashboard Investidores"/>

                <Form ref={formRef} onSubmit={handleSubmit}> 
                
                    {/* <h1>Login</h1> */}
                    {/* <Input name="email" icon={FiMail} placeholder="E-mail"/> */}
                    {/* <Input name="password" icon={FiLock} type="password" placeholder="Senha"/> */}
                    <GoogleLogin
                    clientId="906405271055-bc7ka1halimt9p2gg44m63qb8gi765nk.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={handleSubmit}
                    onFailure={handleSubmit}
                    cookiePolicy={'single_host_origin'}
                    
  />
                    {/* <button type="submit">Entrar</button> */}
                    {/* <a href="forgot">Esqueci minha senha</a> */}
                </Form>

                {/* <a href="login">Criar conta</a> */}
            </Content>
            <Background/>
        </Container>
    )
};

export default SignIn;