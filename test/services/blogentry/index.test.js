'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('blogentry service', function() {
  it('registered the blogentries service', () => {
    assert.ok(app.service('blogentries'));
  });
});
