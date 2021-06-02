import React, { useRef, useCallback } from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logodireto.png';
import Input from '../../components/input';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utilities/getValidationErrors';

const SignIn = () => {
    const formRef = useRef(null);

    console.log(formRef)

        const handleSubmit = useCallback(async (data) => {
            console.log(data)
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória')
                });

                await schema.validate(data, {
                    abortEarly: false
                })
            }   catch (err) {
                    console.log(err)
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
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                    <button type="submit">Entrar</button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                {/* <a href="login">Criar conta</a> */}
            </Content>
            <Background/>
        </Container>
    )
};

export default SignIn;