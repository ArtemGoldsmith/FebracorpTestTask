var express = require('express');
var router = express.Router();

function gaussRound(num, decimalPlaces) {
  var d = decimalPlaces || 0,
    m = Math.pow(10, d),
    n = +(d ? num * m : num).toFixed(8),
    i = Math.floor(n), f = n - i,
    e = 1e-8,
    r = (f > 0.5 - e && f < 0.5 + e) ?
      ((i % 2 === 0) ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}

/* GET home page. */
router.get('/', function(req, res, next) {

  //set default variables
  var totalItems = 9,
    pageSize = 3,
    currentPage = 1,
    items = [],
    itemsArrays = [],
    itemsList = [];

  if ( (totalItems / pageSize) % 2 ) {
    pageCount = gaussRound(totalItems / pageSize);
  } else {
    pageCount = totalItems / pageSize;
  }
  console.log(pageCount);

  for (var i = 1; i < totalItems; i++) {
    items.push({
      name: 'Item',
      type: 'A',
      number: i
    });
  }

  while (items.length > 0) {
    itemsArrays.push(items.splice(0, pageSize));
  }

  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }

  itemsList = itemsArrays[+currentPage - 1];

  //render index.ejs view file
  res.render('index', {
    items: itemsList,
    pageSize: pageSize,
    totalItems: totalItems,
    pageCount: pageCount,
    currentPage: currentPage,
    title: 'Test Task'
  });
});

module.exports = router;