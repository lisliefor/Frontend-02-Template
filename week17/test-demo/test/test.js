var assert = require("assert");
import { add, mul } from '../add.js';

// ./node_modules/.bin/nyc ./node_modules/.bin/mocha --require @babel/register
describe("add function testing", () => {
  it("1 + 2 should be 3.", function () {
    assert.equal(add(1, 2), 3);
  });

  it("-9 + 4 should be 5.", function () {
    assert.equal(add(-9, 4), -5);
  });
});

describe("mul function testing", () => {
  it("-3 * -5 should be 15.", function () {
    assert.equal(mul(-3, -5), 15);
  });
});
