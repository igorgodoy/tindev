const express  = require('express'); // import de todo o Express
const devController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const LoginController = require('./controllers/LoginController');
const checkIsAuth = require('./middleware/checkIsAuthenticated.js');
const routes = express.Router(); // criando objeto especifico para rotas

// método GET que traduz rotas e envia respostas de requisições, "/" está escutando a raiz da aplicação
// routes.get('/', (req, res) => {
//     // metodo query em res consegue captar todos os parametros enviados na requisição GET
//     let name = req.query.name;

//     // envia uma resposta para o client
//     // res.send(`Hello ${name}!`); // `` + ${} => serve para passar variáveis em meio a uma string

//     // retorna um json
//     res.json({
//         message: `Hello ${name}!`
//     });
// });

// método POST
// routes.post('/dev', (req, res) => {
//     res.json(
//         req.body
//     );
// });

// método POST
routes.post('/dev', devController.store);

routes.get('/dev/login', LoginController.show);

routes.get('/dev', checkIsAuth, devController.index);

routes.get('/dev/user', checkIsAuth, devController.show);

// passado parametro na URL
routes.post('/dev/:devId/like', checkIsAuth, LikeController.store);

// passado parametro na URL
routes.post('/dev/:devId/dislike', checkIsAuth, DislikeController.store);

module.exports = routes;
