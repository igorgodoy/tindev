const Dev = require('../models/Dev'); // importa o model do Dev
require("dotenv-safe").config();
const Jwt = require('jsonwebtoken');

module.exports = {
    async show(req, res){ // show lista apenas um unico registro de determinada entidade
        const {username, password} = req.headers;

        if (!username || !password) {
            return res.json({success: false, error: 'Preencha os campos corretamente'});
        }

        const user = await Dev.findOne({
            user: username
        }).select('+password'); // necessário incluir select('+password') pois o campo password é um campo que exclui do select por segurança

        if (!user) {
            return res.json({success: false, error: 'Usuário não encontrado'});
        }

        const {password: passwordRegitered, _id} = user;

        if (password === passwordRegitered) {
            let tokenData = {
                username: username,
                password : password
            };
            
            let token = Jwt.sign(tokenData, process.env.SECRET, {
                expiresIn: 86400
            });

            return res.json({success: true, id: _id, msg: 'Login efetuado com sucesso', auth: true, token: token});
        } else {
            return res.json({success: false, error: 'Senha incorreta'});
        }
    }
};