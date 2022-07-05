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

module.exports = {
  getAll,
  getById,
};
