const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Create a new Hapi server instance

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

// Define the routes
server.route(routes);

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    process.exit(1);
  }
}

start();
