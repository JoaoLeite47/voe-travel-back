const express = require("express");
require("dotenv").config();
const models = require("./src/services/models/models");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("connected to API!");
});

app.get("/clientes", async (req, res) => {
  const results = await models.selectClients();
  res.json(results);
});

app.get("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectClientsId(id);
  res.json(results);
});

app.post("/clientes", async (req, res) => {
  const clientes = req.body;
  await models.insertClients(clientes);
  res.sendStatus(201);
});

app.patch("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  await models.updateClients(data, id);
  res.sendStatus(200);
});

app.delete("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await models.deleteClients(id);
  res.sendStatus(204);
});

app.get("/opcoes_aereas", async (req, res) => {
  const results = await models.selectOpcoesAereas();
  res.json(results);
});

app.get("/opcoes_aereas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesAereasId(id);
  res.json(results);
});

app.get("/opcoes_aereas_cliente/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesAereasClientId(id);
  res.json(results);
});

app.post("/opcoes_aereas", async (req, res) => {
  const opcoes_aereas = req.body;
  await models.insertOpcoesAereas(opcoes_aereas);
  res.sendStatus(201);
});

app.patch("/opcoes_aereas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  await models.updateOpcoesAereas(data, id);
  res.sendStatus(200);
});

app.delete("/opcoes_aereas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await models.deleteOpcoesAereas(id);
  res.sendStatus(204);
});

app.get("/opcoes_hoteis", async (req, res) => {
  const results = await models.selectOpcoesHoteis();
  res.json(results);
});

app.get("/opcoes_hoteis/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesHoteisId(id);
  res.json(results);
});

app.get("/opcoes_hoteis_cliente/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesHoteisClientId(id);
  res.json(results);
});

app.post("/opcoes_hoteis", async (req, res) => {
  const opcoes_hoteis = req.body;
  await models.insertOpcoesHoteis(opcoes_hoteis);
  res.sendStatus(201);
});

app.patch("/opcoes_hoteis/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  await models.updateOpcoeshoteis(data, id);
  res.sendStatus(200);
});

app.delete("/opcoes_hoteis/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await models.deleteOpcoesHoteis(id);
  res.sendStatus(204);
});

app.get("/servicos", async (req, res) => {
  const results = await models.selectOpcoesServicos();
  res.json(results);
});

app.get("/servicos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesServicosId(id);
  res.json(results);
});

app.get("/servicos_client/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesServicosId(id);
  res.json(results);
});

app.post("/servicos", async (req, res) => {
  const servicos = req.body;
  await models.insertServicos(servicos);
  res.sendStatus(201);
});

app.patch("/servicos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  await models.updateServicos(data, id);
  res.sendStatus(200);
});

app.delete("/servicos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await models.deleteServicos(id);
  res.sendStatus(204);
});

app.listen(process.env.PORT, () => {
  console.log("app is runnig");
});
