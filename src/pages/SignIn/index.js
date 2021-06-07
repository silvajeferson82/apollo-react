import React, { useRef, useCallback } from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logodireto.png';
import Input from '../../components/input';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utilities/getValidationErrors';
import api from '../../service/api';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const SignIn = () => {
    let history = useHistory();
    const formRef = useRef(null);

        const handleSubmit = useCallback(async (data) => {

            try {

                formRef.current?.setErrors({});

                // const schema = Yup.object().shape({
                //     email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                //     password: Yup.string().required('Senha obrigatória')
                // });

                // await schema.validate(data, {
                //     abortEarly: false
                // })
                

                await api.post('/usuarioLogin', { 
                    usuario: data.profileObj.email
                 }).then(resp => {
                     const { data } = resp;
                     localStorage.setItem('isAuthenticated', window.btoa(data));
                     if (data) {
                         history.push('/home');
                     }
                     if (resp) {
                         const isAuthenticated = true;
                         localStorage.setItem('isSign', isAuthenticated);
                     }
                 } )
            }   catch (err) {
                    // console.log('erroooow',err)
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
            }
        }, []);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Dashboard Investidores"/>

                <Form ref={formRef} onSubmit={handleSubmit}> 
                
                    <h1>Login</h1>
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