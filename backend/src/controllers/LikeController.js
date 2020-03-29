const axios = require('axios'); // importa o pacote axios
const Dev = require('../models/Dev'); // importa o model do Dev

module.exports = {
    async store(req, res){
        const {devId} = req.params, // pega qualquer dado vindo da rota
              {user} = req.headers; // pega qualquer dado do header

        const targetDev = await Dev.findById(devId) // busca pelo id
        .catch(err => { // catch trata erros
            res.status(400).json({success: false, msg: 'Usuário não encontrado'});
        });

        const loggedDev = await Dev.findById(user) // busca pelo id
        .catch(err => { // catch trata erros
            res.status(400).json({success: false, msg: 'Usuário não encontrado'});
        });

        if (!loggedDev.likes.includes(targetDev._id)) { // se já existe determinado registro no array
            loggedDev.likes.push(targetDev._id);
            loggedDev.save();

            const match = targetDev.likes.includes(loggedDev._id) ? true : false;

            res.json({success: true, msg: 'Liked', match: match});
        } else {
            res.status(400).json({success: false, msg: 'Usuário já curtido'});
        }
    }
};