var express = require('express');
var router = express.Router();
/*local strategies needed*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slam Crown Login' });
});

module.exports = router;