const mysql = require("mysql2/promise");
// const enviarEmailBackup = require("../sendEmail/sendEmail")

const connection = mysql.createPool(process.env.DATABASE_URL);

exports.selectClients = async () => {
  const result = await connection.query("SELECT * FROM clientes;");
  return result[0];
};

exports.selectClientsId = async (id) => {
  const result = await connection.query("SELECT * FROM clientes WHERE id=?;", [
    id,
  ]);
  return result[0];
};

exports.insertClients = async (data) => {
  const values = [data.nome, data.pedido];
  await connection.query(
    "INSERT INTO clientes(nome, pedido) VALUES (?,?)",
    values
  );
  // await enviarEmailBackup(data);
};

exports.updateClients = async (data, id) => {
  const values = [data.nome, data.pedido, id];
  await connection.query(
    "UPDATE clientes SET nome=?,pedido=? WHERE id=?",
    values
  );
};

exports.deleteClients = async (id) => {
  const values = [id];
  await connection.query("DELETE FROM clientes WHERE id=?", values);
};

exports.selectOpcoesAereas = async () => {
  const result = await connection.query("SELECT * FROM opcoes_aereas;");
  return result[0];
};

exports.selectOpcoesAereasId = async (id) => {
  const result = await connection.query(
    "SELECT * FROM opcoes_aereas WHERE id=?;",
    [id]
  );
  return result[0];
};

exports.selectOpcoesAereasClientId = async (id) => {
  const result = await connection.query(
    "SELECT * FROM opcoes_aereas WHERE id_client=?;",
    [id]
  );
  return result[0];
};

exports.insertOpcoesAereas = async (data) => {
  const values = [
    data.id_client,
    data.origem,
    data.destino,
    data.data_inicial,
    data.data_final,
    data.horario_inicial,
    data.horario_final,
    data.valor_inicial,
    data.valor_final,
    data.cia_aerea,
  ];
  await connection.query(
    "INSERT INTO opcoes_aereas(id_client, origem, destino, data_inicial, data_final, horario_inicial, horario_final, valor_inicial, valor_final, cia_aerea) VALUES (?,?,?,?,?,?,?,?,?,?)",
    values
  );
};

exports.updateOpcoesAereas = async (data, id) => {
  const values = [
    data.id_client,
    data.origem,
    data.destino,
    data.data_inicial,
    data.data_final,
    data.horario_inicial,
    data.horario_final,
    data.valor_inicial,
    data.valor_final,
    data.cia_aerea,
    id,
  ];
  await connection.query(
    "UPDATE opcoes_aereas SET id_client=?,origem=?,destino=?,data_inicial=?,data_final=?,horario_inicial=?,horario_final=?,valor_inicial=?,valor_final=?,cia_aerea=? WHERE id=?",
    values
  );
};

exports.deleteOpcoesAereas = async (id) => {
  const values = [id];
  await connection.query("DELETE FROM opcoes_aereas WHERE id=?", values);
};

exports.selectOpcoesHoteis = async () => {
  const result = await connection.query("SELECT * FROM opcoes_hoteis;");
  return result[0];
};

exports.selectOpcoesHoteisId = async (id) => {
  const result = await connection.query(
    "SELECT * FROM opcoes_hoteis WHERE id=?;",
    [id]
  );
  return result[0];
};

exports.selectOpcoesHoteisClientId = async (id) => {
  const result = await connection.query(
    "SELECT * FROM opcoes_hoteis WHERE client_id=?;",
    [id]
  );
  return result[0];
};

exports.insertOpcoesHoteis = async (data) => {
  const values = [
    data.client_id,
    data.imagem1,
    data.imagem2,
    data.imagem3,
    data.endereco,
    data.data_inicial,
    data.data_final,
    data.quarto_escolhido,
    data.quarto_escolhido_tipo,
    data.quarto_escolhido_endereco,
    data.cafe_da_manha,
    data.valor_inicial,
    data.valor_final,
  ];
  await connection.query(
    "INSERT INTO opcoes_hoteis(client_id, imagem1, imagem2, imagem3, endereco, data_inicial, data_final, quarto_escolhido, quarto_escolhido_tipo, quarto_escolhido_endereco, cafe_da_manha, valor_inicial,valor_final ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    values
  );
};

exports.updateOpcoeshoteis = async (data, id) => {
  const values = [
    data.client_id,
    data.imagem1,
    data.imagem2,
    data.imagem3,
    data.endereco,
    data.data_inicial,
    data.data_final,
    data.quarto_escolhido,
    data.quarto_escolhido_tipo,
    data.quarto_escolhido_endereco,
    data.cafe_da_manha,
    data.valor_inicial,
    data.valor_final,
    id,
  ];
  await connection.query(
    "UPDATE opcoes_hoteis SET client_id=?,imagem1=?,imagem2=?,imagem3=?,endereco=?,data_inicial=?,data_final=?,quarto_escolhido=?,quarto_escolhido_tipo=?,quarto_escolhido_endereco=?,cafe_da_manha=?,valor_inicial=?,valor_final=? WHERE id=?",
    values
  );
};

exports.deleteOpcoesHoteis = async (id) => {
  const values = [id];
  await connection.query("DELETE FROM opcoes_hoteis WHERE id=?", values);
};

exports.selectOpcoesServicos = async () => {
  const result = await connection.query("SELECT * FROM servicos;");
  return result[0];
};

exports.selectOpcoesServicosId = async (id) => {
  const result = await connection.query("SELECT * FROM servicos WHERE id=?;", [
    id,
  ]);
  return result[0];
};

exports.selectOpcoesServicosId = async (id) => {
  const result = await connection.query("SELECT * FROM servicos WHERE client_id=?;", [
    id,
  ]);
  return result[0];
};

exports.insertServicos = async (data) => {
  const values = [
    data.client_id,
    data.aluguel_de_carros,
    data.aluguel_de_carros_descricao,
    data.passeios,
    data.passeios_descricao,
    data.ingressos,
    data.ingressos_descricao,
    data.guias,
    data.guias_descricao,
    data.cruzeiros,
    data.cruzeiros_descricao,
  ];
  await connection.query(
    "INSERT INTO servicos(client_id, aluguel_de_carros, aluguel_de_carros_descricao, passeios, passeios_descricao, ingressos, ingressos_descricao, guias, guias_descricao, cruzeiros, cruzeiros_descricao ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    values
  );
};

exports.updateServicos = async (data, id) => {
    const values = [
        data.client_id,
        data.aluguel_de_carros,
        data.aluguel_de_carros_descricao,
        data.passeios,
        data.passeios_descricao,
        data.ingressos,
        data.ingressos_descricao,
        data.guias,
        data.guias_descricao,
        data.cruzeiros,
        data.cruzeiros_descricao,
        id
      ];
    await connection.query(
      "UPDATE servicos SET client_id=?,aluguel_de_carros=?,aluguel_de_carros_descricao=?,passeios=?,passeios_descricao=?,ingressos=?,ingressos_descricao=?,guias=?,guias_descricao=?,cruzeiros=?,cruzeiros_descricao=? WHERE id=?",
      values
    );
  };

  exports.deleteServicos = async (id) => {
    const values = [id];
    await connection.query("DELETE FROM servicos WHERE id=?", values);
  };