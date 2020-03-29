const express  = require('express'); // import de todo o Express
const mongoose = require('mongoose'); // import de todo o mongoose
const cors = require('cors'); // import de todo o cors
const routes = require('./routes'); // import module routes
const server = express(); // criação de constante server que receberá todos os métodos de Express
require("dotenv-safe").config();

mongoose.connect(process.env.MONGODBINFO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// dizendo que iremos trabalhar com json
server.use(express.json());

// usando o cors para que o react e o react native tenham permissão para requisições
server.use(cors());

// importando configuraçao do modulo routes dentro de server
server.use(routes);

server.listen(3333); // escutando a porta 3333