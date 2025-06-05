const { expect } = require('chai');
const sinon = require('sinon');
const Tour = require('../models/Tour');
const { getTours } = require('../controllers/tourController');

describe('Tour Controller', () => {
  it('should return list of tours', async () => {
    const req = { query: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const tours = [{ name: 'Карпати', price: 5000 }];
    sinon.stub(Tour, 'find').resolves(tours);

    await getTours(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(tours)).to.be.true;

    Tour.find.restore();
  });
});
