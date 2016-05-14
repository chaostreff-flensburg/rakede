'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'blogentries.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/blogentries', service(options));

  // Get our initialize service to that we can bind hooks
  const blogentryService = app.service('/blogentries');

  // Set up our before hooks
  blogentryService.before(hooks.before);

  // Set up our after hooks
  blogentryService.after(hooks.after);
};
