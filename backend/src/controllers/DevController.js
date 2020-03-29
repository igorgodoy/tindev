const axios = require('axios'); // importa o pacote axios
const Dev = require('../models/Dev'); // importa o model do Dev

module.exports = {
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({ // método axios para realizar um select
            $and: [ // usando lógica AND
                {_id: {$ne: loggedDev._id}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}}
            ],
        });

        res.json(users);
    },

    async show(req, res){
        const {user} = req.headers;

        const devFound = await Dev.findById(user);

        res.json(devFound);
    },
    
    async store(req, res){ // store cria registros, ou seja, usado com requisições POST
        const {username, password} = req.body; // buscará dentro de req.body o atributo username

        if (!username || !password) {
            return res.json({success: false, error: 'Preencha os campos corretamente'});
        }
        // findOne faz um select trazendo um unico registro
        const userExists = await Dev.findOne({
            user: username
        });

        if (userExists) {
            return res.json({success: false, msg: 'Usuário existente'});
        }

        // requisição API pelo axios
        const response = await axios.get(`https://api.github.com/users/${username}`)
        .catch(err => { // catch trata erros
            return res.json({success: false, error: 'Usuário não encontrado'});
        });
        /* await significa que o código esperará o final da tarefa para continuar
            sempre que await é utilizado, a função deve ser assíncrona = async */

        const {name, bio, avatar_url: avatar} = response.data; // os dados retornados da consulta do axios ficam dentro de data

        const dev = await Dev.create({
            name: name ? name : username,
            user: username,
            password: password,
            bio: bio ? bio : 'Nada a declarar.',
            avatar: avatar
        });

        const {_id: id} = dev;

        // return res.json(dev); // dev contem todos os dados do registro no banco de dados
        return res.json({success: true, msg: 'Cadastrado com sucesso', id: id});
    }
};