const productModel = require('../models/productModel');

const getAll = async () => {
  const product = await productModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return {
      statusCode: 404,
      message: 'Product not found',
    };
  }
  return { statusCode: 200, product };
};

module.exports = {
  getAll,
  getById,
};