var express = require('express');
var router = express.Router();
var localStrategy = require('/auth/strategies');

/* GET home page or index.js/ slam crown landing page. */
router.get('/', localStrategy, function(req, res, next) {
  res.render('index', { title: 'Slam Crown App index.js' });
});

module.exports = router;