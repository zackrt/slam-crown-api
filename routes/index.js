var express = require('express');
var router = express.Router();
var localStrategy = require('/auth/strategies');
/*local strategies needed*/

/* GET home page. */
router.get('/', localStrategy, function(req, res, next) {
  res.render('index', { title: 'Slam Crown App' });
});

module.exports = router;