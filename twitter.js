module.exports.send_tweet = function send_tweet(txt) {
    var Twitter = require('twitter');
 
    var client = new Twitter({
    consumer_key: 'PBZfwrMarUsxU1JY3QuSFaD6f',
    consumer_secret: 'cnDzsodQSYCXcuc8PAg8ee7jsU1eut8NYy3ZNzzNIkNR4Lb8re',
    access_token_key: '3692376076-6C4zQ5WMN9loOoNpcYnHEXIxBPVBBh2u5n08eGJ',
    access_token_secret: 'oMDl6qCYg2xMfdEB9BXNtUVDAzTVbKBxlZ9xblzTxUfpv'
    });

    client.post('statuses/update', {status: String(txt)}, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
    });  
}

function streamAnalyzer(search_str) {
    var Analyzer = require('natural').SentimentAnalyzer;
    var stemmer = require('natural').PorterStemmer;
    var analyzer = new Analyzer("English", stemmer, "afinn");


    var weight_avg = 0;
    var weight_count = 0;
    var weight_sum = 0;

    client.stream('statuses/filter', {track: search_str},  function(stream) {
        stream.on('data', function(tweet) {
            txt = tweet.text;
            if (txt != null) {
                weight = analyzer.getSentiment(txt.split(' '));
                if (weight != 0) {
                    weight_count += 1;
                    weight_sum += weight;
                    weight_avg = weight_sum / weight_count;
                    console.log(weight_avg)
                }
            }
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
}