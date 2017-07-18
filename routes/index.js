var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app_data = require( '../app/data' );


// Get Items Options
router.use(bodyParser.json());

router.post('/itemsQuantity', function(req, res) {
  res.send(req.body);
  app_data.dataSet( req.body.itemsQuantity, req.body.itemsType, req.body.itemsList );
});

// Get Home page
router.get('/', function(req, res, next) {
  //set default variables
  //render index.ejs view file
  res.render('index', app_data.parseIndexViewData( req ) );
});

module.exports = router;