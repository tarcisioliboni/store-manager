const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const product = await productService.getAll();
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { product, statusCode, message } = await productService.getById(id);
  if (message) {
    return res.status(statusCode).json({ message });
  }
  return res.status(statusCode).json(product);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { product, statusCode, message } = await productService.addProduct(name);
  if (message) {
    return res.status(statusCode).json({ message });
  }
  return res.status(statusCode).json({ id: product.id, name });
};

module.exports = {
  getAll,
  getById,
  addProduct,
};