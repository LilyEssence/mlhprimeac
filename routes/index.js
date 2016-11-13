var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

/* GET home page. */
router.get('/', function(req, res, next) {
  var client = new Twitter({
        consumer_key: 'vFJH8eQRIzIzZl3bdp1QTNyRW',
        consumer_secret: 'GTT0YmOVIENJV1DeXoVnzIl0695m4TBdwa2h8cprugotE5rxtU',
        access_token_key: '797552586689810432-3DC9q15rb4l0PFBylHxxpBBb1ASN60R',
        access_token_secret: 'dsLSG9Tf6ur4GC9PEFXOy64GFeKr6j4fhRcKmYWEGdCAm'
  });

  client.get('statuses/mentions_timeline', {trim_user: true}, function(error, tweets, response) {
      var coldvotes = 0;
      var hotvotes = 0;

      for (var x = 0; x < tweets.length; x++) {
        var hashtags = tweets[x].entities.hashtags;
        for (var y = 0; y < hashtags.length; y++) {
            if(hashtags[y].text === "toocold") {
                coldvotes++;
            } else if(hashtags[y].text === "toohot") {
                hotvotes++;
            }
        }
      }
      res.render('mainpage', {coldvotes: coldvotes, 
          hotvotes: hotvotes, 
          totalvotes: coldvotes + hotvotes,
          ratio: 50});
  });

});

module.exports = router;
