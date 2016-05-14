'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('blog service', function() {
  it('registered the blogs service', () => {
    assert.ok(app.service('blogs'));
  });
});
