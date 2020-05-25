const path = require('path');

const setupRoutes = (server) => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'statics'),
        index: 'index.html',
      },
    },
  });
};

module.exports = {
  setupRoutes,
};
