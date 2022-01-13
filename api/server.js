const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json(), logger);

// global middlewares and the user's router need to be connected here
const usersRouter = require('./users/users-router') ;
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(function(req, res) {
  res.status(404).json({ message: 'The post requested does not exist'});
});

module.exports = server;