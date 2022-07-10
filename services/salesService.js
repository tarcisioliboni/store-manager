const { salesValidation } = require('../helpers/salesValidation');
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

module.exports = { addSale };
