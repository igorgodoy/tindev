import React , {useEffect, useState} from 'react';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../styles/Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/Api.js'
import { logout } from '../services/Auth.js';

function Main({match, history}) {
  const [users, setUsers] = useState([]); // useState para acessar variáveis dentro do return
  const [loggedUser, setLoggedUser] = useState(false);
  useEffect(() => { // useEffect permite criarmos funções antes do return
    async function loadUsers() {
      const request = await api.get('/dev', {
        headers: {
          user: match.params.devId
        }
      });

      setUsers(request.data);
    }

    async function loadLoggedUserData() {
      const request = await api.get('/dev/user', {
        headers: {
          user: match.params.devId
        }
      });

      setLoggedUser(request.data);
    }

    loadLoggedUserData();
    loadUsers();
  }, [match.params.devId]); // array de variaveis, controla quando a funçao será chamada (a cada alteração na variável)

  useEffect(() => { // useEffect permite criarmos funções antes do return

  }, []);

  async function handleLike(likedUserId) {
    const response = await api.post(`/dev/${likedUserId}/like`, null, { // null = body
      headers: {
        user: match.params.devId
      }
    });

    const { match: matchBool } = response.data;

    if (matchBool) {
      NotificationManager.success('Deu Match!');
    }

    setUsers(users.filter(user => user._id !== likedUserId)); // chamando set users para retirar da tela o dev liked
  }

  async function handleDislike(dislikedUserId) {
    await api.post(`/dev/${dislikedUserId}/dislike`, null, { // null = body
      headers: {
        user: match.params.devId
      }
    });

    setUsers(users.filter(user => user._id !== dislikedUserId)); // chamando set users para retirar da tela o dev disliked
  }

  async function handleLogout() {
    logout();
    NotificationManager.success('Logout realizado com sucesso');
    history.push(`/`); // propriedade history do Routes tem a função push, parametro é a rota desejada
  }

  return (
    <div className="main-container">
      <div className="header-container">
        <div></div>
        <img src={logo} alt="Tindev" />
        <div className="dropdown">
          <img className="user-avatar" src={loggedUser.avatar} alt={loggedUser.bio} />
          <div className="dropdown-content">
            <a href="" onClick={() => handleLogout()}>Sair</a>
          </div>
        </div>
      </div>
      { users.length > 0 ? (
        <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button" onClick={() => handleLike(user._id) /* Necessário passar dentro de arrow function para evitar o call da função no render do componente */}>
                <img src={like} alt="Like" />
              </button>
              <button type="button" onClick={() => handleDislike(user._id) /* Necessário passar dentro de arrow function para evitar o call da função no render do componente */}>
                <img src={dislike} alt="Dislike" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      ) : (
        <div className="empty">
          <p>Acabou :(</p>
        </div>
      ) }
      
      <NotificationContainer />
    </div>
  );
}

export default Main;
