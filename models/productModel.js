const connection = require('./connections');

const getAll = async () => {
  const [product] = await connection
    .query('SELECT * FROM StoreManager.products;');
  return product;
};

const getById = async (id) => {
  const [[product]] = await connection
    .query('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return product;
};

const addProduct = async (name) => {
  const [product] = await connection
    .query('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);
  return ({ id: product.insertId });
};

const removeProduct = async (id) => {
  await connection
    .query('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  removeProduct,
};
