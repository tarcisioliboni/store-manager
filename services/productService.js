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

const addProduct = async (name) => {
  if (!name) {
    return { statusCode: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return {
      statusCode: 422, message: '"name" length must be at least 5 characters long',
    };
  }
  const { id } = await productModel.addProduct(name);
  return { statusCode: 201, product: { id } };
};

module.exports = {
  getAll,
  getById,
  addProduct,
};