const express = require("express");
require("dotenv").config();
const models = require("./src/services/models/models");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Substitua pela origem do seu cliente
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "uploads";

    // Verifique se a pasta de destino existe, crie-a se não existir
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res, next) => {
  res.send("connected to API!");
});

app.post("/enviarEmail", (req, res) => {
  const { nome, email, numero, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "",
      pass: "",
    },
  });

  const mailOptions = {
    from: "",
    to: "",
    subject: "Formulário (Voe+Travel)",
    text: `Nome: ${nome}\nE-mail: ${email}\nNúmero: ${numero}\nMensagem: ${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erro no envio do e-mail");
    } else {
      console.log("E-mail enviado: " + info.response);
      res.status(200).send("E-mail enviado com sucesso");
    }
  });
});

app.get("/clientes", async (req, res) => {
  const results = await models.selectClients();
  res.json(results);
});

app.get("/clientes_all/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectClienteData(id);
  res.json(results);
});

app.get("/clientesPedido/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectClientsByNumber(id);
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

app.post(
  "/opcoes_hoteis",
  upload.fields([
    { name: "imagem1", maxCount: 1 },
    { name: "imagem2", maxCount: 1 },
    { name: "imagem3", maxCount: 1 },
  ]),
  async (req, res) => {
    const opcoes_hoteis = req.body;
    const images = req.files; // As imagens enviadas estarão disponíveis em req.files

    try {
      await models.insertOpcoesHoteis(opcoes_hoteis, images);
      res.sendStatus(201);
    } catch (error) {
      console.error("Erro ao inserir opções de hotéis:", error);
      res.status(500).send("Erro interno no servidor");
    }
  }
);

app.patch(
  "/opcoes_hoteis/:id",
  upload.fields([
    { name: "imagem1", maxCount: 1 },
    { name: "imagem2", maxCount: 1 },
    { name: "imagem3", maxCount: 1 },
  ]),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const images = req.files; // Imagens enviadas estarão disponíveis em req.files

    try {
      await models.updateOpcoeshoteis(data, id, images);
      res.sendStatus(200);
    } catch (error) {
      console.error("Erro ao atualizar opções de hotéis:", error);
      res.status(500).send("Erro interno no servidor");
    }
  }
);

app.delete("/opcoes_hoteis/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await models.SelectOpcoesHoteisImages(id);

    if (!result || result.length === 0) {
      throw new Error("Entrada não encontrada para o ID especificado");
    }

    const { imagem1, imagem2, imagem3 } = result[0];

    // Função para verificar e excluir o arquivo
    const deleteFile = async (path) => {
      if (fs.existsSync(path)) {
        await unlinkAsync(path);
        console.log(`Arquivo ${path} excluído com sucesso.`);
      } else {
        console.log(`Arquivo ${path} não encontrado.`);
      }
    };

    // Exclua as imagens do sistema de arquivos se existirem
    await deleteFile(`uploads/${imagem1}`);
    await deleteFile(`uploads/${imagem2}`);
    await deleteFile(`uploads/${imagem3}`);

    // Agora exclua a entrada do banco de dados
    await models.deleteOpcoesHoteis(id);
    console.log(`Opções de hotéis com ID ${id} excluídas com sucesso.`);
    res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao excluir opções de hotéis:", error);
    res.status(500).send("Erro interno no servidor");
  }
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
  const results = await models.selectOpcoesServicosClientId(id);
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

app.get("/valores", async (req, res) => {
  const results = await models.selectOpcoesValores();
  res.json(results);
});

app.get("/valores/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesValoresId(id);
  res.json(results);
});

app.get("/valores_cliente/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await models.selectOpcoesValoresClientId(id);
  res.json(results);
});

app.post("/valores", async (req, res) => {
  const valores = req.body;
  await models.insertValores(valores);
  res.sendStatus(201);
});

app.patch("/valores/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  await models.updateValores(data, id);
  res.sendStatus(200);
});

app.delete("/valores/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await models.deleteValores(id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("app is runnig");
});
