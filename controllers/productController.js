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
  res.status(statusCode).json(product);
};

module.exports = {
  getAll,
  getById,
};