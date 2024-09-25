const express = require('express')
const { create } = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const Clientes = require('./models/post')

const app = express()
const handlebars = create({ defaultLayout: 'main' })

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("cadastro")
})

app.post("/cadastrar", function (req, res) {
  Clientes.create({ 
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
    }).then(function () {
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send("Erro: " + erro)
    })
})

app.get("/consulta", function (req, res) {
    Clientes.findAll().then(function (clientes) { 
        res.render("consulta", { clientes: clientes }) 
        console.log(Clientes) 
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/editar/:id", function (req, res) {
    Clientes.findAll({ where: { "id": req.params.id } }).then(function (clientes) {
        res.render("editar", { clientes: clientes }) 
        console.log(clientes) 
    }).catch(function (erro) {
        console.log("Erro ao editar os dados: " + erro)
    })
})

app.post("/atualizar", function (req, res) {
    Clientes.update({ 
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
    }, { where: { id: req.body.id } }).then(function () {
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send("Erro ao atualizar: " + erro)
    })
})

app.get("/excluir/:id", function (req, res) {
    Clientes.destroy({ where: { "id": req.params.id } }).then(function () { 
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send("Erro ao deletar: " + erro)
    })
})

app.listen(8081, function () {
    console.log("Servidor Ativo!")
})