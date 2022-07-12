const { salesValidation } = require('../middlewares/salesValidation');
const salesModel = require('../models/salesModel');

const addSale = async (product) => {
  const { statusCode, message } = salesValidation(product);
  if (message) {
    return { statusCode, message };
  }
  const ids = product.map(({ productId: id }) => salesModel.searchId(id));
  const response = await Promise.all(ids);
  const searchId = response.some((id) => id === undefined);
  if (searchId) {
    return { statusCode: 404, message: 'Product not found' };
  }
  const productSale = await salesModel.salesProducts(product);
  return { statusCode: 201, productSale };
};

const getAll = async () => {
  const product = await salesModel.getAll();
  const mapSales = product.map(
    ({ saleId, date, productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  );
  return { statusCode: 200, mapSales };
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  if (product.length === 0) {
    return {
      statusCode: 404,
      message: 'Sale not found',
    };
  }  
  const sales = product.map(({ date, productId, quantity }) => ({
    date,
    productId,
    quantity,
  }));
    return { statusCode: 200, sales };
};

module.exports = {
  addSale,
  getAll,
  getById,
};
