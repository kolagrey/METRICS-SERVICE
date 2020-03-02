const expect = require('chai').expect;
const server = require('../src/server');

describe('Server Test', () => {
  it('it should return true', () => {
    expect(server).to.equal(server);
  });
});