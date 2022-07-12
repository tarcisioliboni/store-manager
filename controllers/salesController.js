const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const sales = req.body;
  const { productSale, statusCode, message } = await salesService.addSale(sales);
  if (message) {
    return res.status(statusCode).json({ message });
  }
  return res.status(statusCode).json(productSale);
};

const getAll = async (_req, res) => {
  const { statusCode, message, mapSales } = await salesService.getAll();
  if (message) {
    return res.status(statusCode).json({ message });
  }
  return res.status(statusCode).json(mapSales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { sales, statusCode, message } = await salesService.getById(id);
  if (message) {
    return res.status(statusCode).json({ message });
  }
  return res.status(statusCode).json(sales);
};

module.exports = {
  addSale,
  getAll,
  getById,
};