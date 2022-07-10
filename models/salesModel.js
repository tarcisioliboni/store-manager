const connections = require('./connections');

const addSale = async () => {
  const [addedProduct] = await connections
    .query('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  return ({ id: addedProduct.insertId });
};

const searchId = async (id) => {
  const [[idProduct]] = await connections
    .query('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return idProduct;
};

const salesProducts = async (sales) => {
  const { id } = await addSale();
  sales.forEach(async ({ quantity, productId }) => {
    await connections
      .query(`INSERT INTO StoreManager.sales_products
        (sale_id, product_id, quantity) VALUES (?, ?, ?);`, [id, productId, quantity]);
  });
  return { id, itemsSold: sales };
};

module.exports = {
  addSale,
  salesProducts,
  searchId,
};
