const fs = require('fs');

module.exports = {
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get('/api/goods/home', (req, res) => {
        fs.readFile('./db/home.json', 'utf8', (err, data) => {
          if (!err) {
            res.json(JSON.parse(data));
          }
        })
      });
    }
  }
}