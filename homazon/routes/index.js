var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.session', req.session)
  res.render('index', {
    user: req.user
  });
});

router.get('/', (req, res, next) => {
  // Insert code to look up all products
  // and show all products on a single page
});

router.get('/product/:pid', (req, res, next) => {
  // Insert code to look up all a single product by its id
  // and show it on the page
});


module.exports = router;
