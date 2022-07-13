const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connections');

describe('Testing productModel', () => {
  beforeEach(sinon.restore);

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
      sinon.stub(connection, 'query').resolves([productsList]);
      expect(await productModel.getAll()).to.be.deep.equal(productsList);
    });

    it('Database error', async () => {
      sinon.stub(connection, 'query').rejects();
      try {
        await productModel.getAll()
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
      }
    });
  });

});