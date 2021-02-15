var express = require('express');
var router = express.Router();

// Require the package
const googleNewsScraper = require('google-news-scraper')


/* GET users listing. */
router.get('/', async function(req, res, next) {
  let searchText = (req.query && req.query.query) || "Los Angeles CA";
  
  const articles = await googleNewsScraper({
    searchTerm: searchText,
    prettyURLs: false,
    timeframe: "5d",
    puppeteerArgs: []
  });
  // console.log(req)
  // console.log(articles);
  var trimmed = [];
  var count = 0;
  for(var i=0; i < articles.length; i++) {
    if (count == 5) {
      break;
    }
    trimmed.push(articles[i]);
    count++;
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.json(trimmed);
});

module.exports = router;