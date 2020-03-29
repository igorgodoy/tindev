const {Schema, model} = require('mongoose');

// Criando estrutura da tabela / entidade
const DevSchema = new Schema({
    name: { // atributo name
        type: String, // tipo string
        required: true // obrigatorio
    },
    user: {
        type: String,
        required: true,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio: String, // se um atributo não será obrigatório ou terá outra configuração, pode-se passar só o type
    avatar: String,
    likes: [{
        type: Schema.Types.ObjectId, // indica que o tipo de dado guardado será um id de algum objeto
        ref: 'Dev' // referente ao dev, ou seja, basicamente fará uma relation
    }],
    dislikes: [{
        type: Schema.Types.ObjectId, // indica que o tipo de dado guardado será um id de algum objeto
        ref: 'Dev' // referente ao dev, ou seja, basicamente fará uma relation
    }]
},{
    timestamps: true // criará na estrutura os campos createdAt e updatedAt
});

module.exports = model('Dev', DevSchema);