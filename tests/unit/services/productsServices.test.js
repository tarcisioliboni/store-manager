const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

describe('Testing productService', () => {
  beforeEach(sinon.restore)

  describe('getAll', () => {
    it('Return all products', async () => {
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
      sinon.stub(productModel, 'getAll').resolves(productsList);
      expect(await productService.getAll()).to.be.deep.equal(productsList);
    });

    it('Model error', async () => {
      sinon.stub(productModel, 'getAll').rejects()
      try {
        await productService.getAll()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    });
  })
});


