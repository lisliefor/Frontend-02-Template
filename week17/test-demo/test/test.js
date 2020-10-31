var assert = require("assert");
import { add } from '../add.js';

describe("add function testing", () => {
  it("1 + 2 should be 3.", function () {
    assert.equal(add(1, 2), 3);
  });

  it("-9 + 4 should be 5.", function () {
    assert.equal(add(-9, 4), -5);
  });
});
