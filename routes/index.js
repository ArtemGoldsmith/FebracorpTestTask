var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var
  totalItems,
  itemsType,
  itemsListing;

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
// Get Items Options
router.use(bodyParser.json());
router.post('/itemsQuantity', function(req, res){
  var obj = {};
  res.send(req.body);
  totalItems = req.body.itemsQuantity;
  itemsType = req.body.itemsType;
  itemsListing = req.body.itemsList;
});


// Get Home page
router.get('/', function(req, res, next) {
  //set default variables
  var
    pageSize = 3,
    currentPage = 1,
    items = [],
    itemsArrays = [],
    itemsList = [];
  if ( totalItems === 0 ) {
    pageCount = 1;
  } else if ( (totalItems / pageSize) % 2 ) {
    pageCount = gaussRound(totalItems / pageSize);
  } else {
    pageCount = totalItems / pageSize;
  }

  for (var i = 1; i < totalItems; i++) {
    items.push({
      name: 'Item',
      type: itemsType,
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
    itemsList: itemsListing,
    title: 'Test Task'
  });
});

module.exports = router;