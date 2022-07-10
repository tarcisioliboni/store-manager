const salesValidation = (product) => {
  const saleId = product.every(({ productId }) => productId);
  const productQuantity = product.every(({ quantity }) => quantity);
  const quantityCheck = product.some(({ quantity }) => quantity <= 0);
  if (!saleId) {
  return { statusCode: 400, message: '"productId" is required' };
  }
  if (quantityCheck) {
    return { statusCode: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  if (!productQuantity) {
    return { statusCode: 400, message: '"quantity" is required' };
  }
  return {};
};

module.exports = { salesValidation };
