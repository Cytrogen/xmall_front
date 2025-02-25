const fs = require('fs');
const {parse} = require("@vue/compiler-sfc");

function pagination(pageSize, currentPage, arr) {
  let skipNum = (currentPage - 1) * pageSize;
  return (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum = pageSize);
}

function sortBy(attr, rev) {
  if (rev === undefined) rev = 1;
  else rev = rev ? 1 : -1;
  return function (a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) return rev * -1;
    if (a > b) return rev * 1;
    return 0;
  }
}

function range(arr, gt, lte) {
  return arr.filter(item => item.salePrice >= gt && item.salePrice <= lte);
}

module.exports = {
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get('/api/goods/home', (req, res) => {
        fs.readFile('./db/home.json', 'utf8', (error, data) => {
          if (!error) {
            res.json(JSON.parse(data));
          }
        })
      });

      devServer.app.get('/api/goods/allGoods', (req, res) => {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const sort = parseInt(req.query.sort);
        const gt = parseInt(req.query.priceGt);
        const lte = parseInt(req.query.priceLte);
        const cid = req.query.cid;
        let newData = [];
        fs.readFile('./db/allGoods.json', 'utf8', (error, data) => {
          let { result } = JSON.parse(data);
          let allData = result.data;
          newData = pagination(size, page, allData);

          if (sort === 1) {
            newData = newData.sort(sortBy('salePrice', true));
          } else if (sort === -1) {
            newData = newData.sort(sortBy('salePrice', false));
          }

          if (gt && lte) {
            newData = range(newData, gt, lte);
          }

          if (newData.length < size) {
            res.json({
              data: newData,
              total: newData.length
            });
          } else {
            res.json({
              data: newData,
              total: allData.length
            })
          }
        })
      })
    }
  }
}