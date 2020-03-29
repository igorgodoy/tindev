import React, {useState} from 'react';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import api from '../services/Api.js';
import '../styles/Login.css';
import logo from '../assets/logo.svg';
import { login } from '../services/Auth.js';

function Login({history}) { // ele herda o props.history por ser chamado pelo Routes
  const [username, setUsername] = useState(''); // inicializando a variavel vazia
  const [password, setPassword] = useState(''); // inicializando a variavel vazia

  async function handleLogin(e){
    e.preventDefault(); // inibi o redirecionamento automatico pelo form

    const request = await api.get('/dev/login', {
      headers:{
        username: username,
        password: password
      }
    });

    const { success, id: devId, msg, error, token } = request.data;

    if (!success) {
      if (error) {
        NotificationManager.error(error);
      } else if (msg) {
        NotificationManager.info(msg);
      }
      return;
    }

    login(token);

    history.push(`/main/${devId}`); // propriedade history do Routes tem a função push, parametro é a rota desejada

    NotificationManager.success(msg);
  }

  async function handleRegister(){

    const request = await api.post('/dev', {
        username,
        password
    });

    // const { success, id: devId, msg , error } = request.data;
    const { success, msg , error } = request.data;

    if (!success) {
      if (error) {
        NotificationManager.error(error);
      } else if (msg) {
        NotificationManager.info(msg);
      }
      return;
    }

    // await history.push(`/main/${devId}`); // propriedade history do Routes tem a função push, parametro é a rota desejada    

    NotificationManager.success(msg);
  }

  return (
    // Ideal o uso de className ao invés de class pois class é uma palavra reservada do JS
      <div className="login-container">
          <form onSubmit={handleLogin}>
            <img src={logo} alt="Tindev" />
            <input
                placeholder="Digite seu usuário no Github" 
                value={username} // dizendo que o value será minha variavel username
                onChange={e => setUsername(e.target.value)} // e que a cada change, ele irá atribuir o value do event a minha variável
            />
            <input
                placeholder="Digite sua senha"
                type="password" 
                value={password} // dizendo que o value será minha variavel username
                onChange={e => setPassword(e.target.value)} // e que a cada change, ele irá atribuir o value do event a minha variável
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => handleRegister()}>Cadastrar</button>
          </form>

          <NotificationContainer />
      </div>
  );
}

export default Login;
