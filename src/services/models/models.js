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
