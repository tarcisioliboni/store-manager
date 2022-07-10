const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const sales = req.body;
  const { productSale, statusCode, message } = await salesService.addSale(sales);
  if (message) {
    return res.status(statusCode).json({ message });
  }
  return res.status(statusCode).json(productSale);
};

module.exports = { addSale };