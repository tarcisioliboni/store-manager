const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

describe('Testing productController', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.restore();
  })

  describe('getAll', () => {
    it('Products list', async () => {
      const productsList = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América",
        }
      ];
      sinon.stub(productService, 'getAll').resolves(productsList)
      await productController.getAll(req, res);
      expect(res.json.calledWith(productsList)).to.be.true
    });

    it('Service error', async () => {
      sinon.stub(productService, 'getAll').rejects();
      try {
        await productController.getAll(req, res);
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
      }
    });
  });
});