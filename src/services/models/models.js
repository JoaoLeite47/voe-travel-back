const mysql = require("mysql2/promise");

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
