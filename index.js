const express = require("express");
require("dotenv").config();
const models = require("./src/services/models/models");

const app = express();

app.use(express.json());

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

app.listen(process.env.PORT, () => {
  console.log("app is runnig");
});
