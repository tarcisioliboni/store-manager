const connection = require('./connections');

const addSale = async () => {
  const [addedProduct] = await connection
    .query('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  return ({ id: addedProduct.insertId });
};

const searchId = async (id) => {
  const [[idProduct]] = await connection
    .query('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return idProduct;
};

const salesProducts = async (sales) => {
  const { id } = await addSale();
  sales.forEach(async ({ quantity, productId }) => {
    await connection
      .query(`INSERT INTO StoreManager.sales_products
        (sale_id, product_id, quantity) VALUES (?, ?, ?);`, [id, productId, quantity]);
  });
  return { id, itemsSold: sales };
};

const getAll = async () => {
  const query = `
    SELECT
      s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
  `;
  const [sales] = await connection
    .query(query);
  return sales;
};

const getById = async (id) => {
  const query = `
    SELECT
      s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE s.id = ?
  `;
  const [sales] = await connection
    .query(query, [id]);
  return sales;
};

module.exports = {
  addSale,
  salesProducts,
  searchId,
  getAll,
  getById,
};
