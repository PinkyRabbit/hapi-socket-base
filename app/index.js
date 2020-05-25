const Hapi = require('@hapi/hapi');
const serveStatic = require('@hapi/inert');

const { setupRoutes } = require('./routes');
const { connectSocketIO } = require('./socket-io.service');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.register(serveStatic);

  setupRoutes(server);
  await server.start();
  console.log('Server running on %s', server.info.uri);
  connectSocketIO(server);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
