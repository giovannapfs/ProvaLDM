const db = require('./banco');

const Clientes = db.sequelize.define('clientes', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
});

db.sequelize.getQueryInterface().showAllTables().then((tables) => {
  Clientes.sync().then(() => console.log('Clients synced successfully!'))
})

module.exports = {
    Clientes: Clientes,
};