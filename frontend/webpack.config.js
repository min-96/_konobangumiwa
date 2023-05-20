const path = require('path');

module.exports = {
  watchOptions: {
    ignored: [/node_modules/, /public/],
    aggregateTimeout: 300,
    poll: 1000,
  },
};
