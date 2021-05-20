import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
//import { toast } from 'react-toastify';

import api from '../service/api';

export default function Login() {
  const [usuario_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await api.post('login', { usuario_email, password });
      localStorage.setItem('profile', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
      window.location = '/home';
      console.log(response.data);
      setLoading(false);
    } catch (e) {
  //    toast.error('E-mail ou senha incorretos!');
      setLoading(false);
      console.log('não foi', e);
    }
  }

  return (
    <div className="login-body">
      <div className="body-container">
        <div className="p-grid p-nogutter">
          <div className="p-col-12 p-lg-6 left-side">
            <img
              style={{
                width: '60%',
                height: '60%',
              }}
              src="assets/layout/images/LogoPague.png"
              alt="apollo-layout"
              className="logo"
            />
          </div>
          <div className="p-col-12 p-lg-6 right-side">
            <div className="login-wrapper">
              <div className="login-container">
                <span className="title">Login</span>

                <div className="p-grid p-fluid">
                  <div className="p-col-12">
                    <InputText
                      placeholder="E-mail"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="p-col-12">
                    <InputText
                      type="password"
                      placeholder="senha"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="p-col-12">
                    <Button
                      label={loading ? 'Carregando...' : 'Entrar'}
                      disabled={loading}
                      onClick={() => handleSubmit()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
