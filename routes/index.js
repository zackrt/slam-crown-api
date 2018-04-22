var express = require('express');
var router = express.Router();
/*local strategies needed*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slam Crown App' });
});
router.post('/login', function(req, res, next) {

});
router.put('/userpage', function()


module.exports = router;
