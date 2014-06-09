/**
 * running index.js will create json of feed specified in `var feed`
 */

// requires
var fs = require ('fs');
var inspect = require('util').inspect;
var FeedParser = require('feedparser');
var request = require('request');
var moment = require('moment');

// data
var feed = 'http://mix.chimpfeedr.com/ca0b6-dc-events';
var wstream = fs.createWriteStream('data.json');

var req = request(feed);
var feedparser = new FeedParser({
        addmeta: false
    });

req.on('response', function(res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser)
});

feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this;
    var item;

    while (item = stream.read()) {
        var normalized = item.title;

        var firstPart = normalized.split( ' on ' )[0];
        var title     = firstPart.split( ' at ' )[0];
        var location  = firstPart.split( ' at ' )[1];

        var secondPart = normalized.split( ' on ' )[1];
        var date = function() {
            var parsed = moment( secondPart, 'MM/DD/YYYY');
            var formattedDate = {
                'year' : moment( parsed ).format("YYYY"),
                'month' : moment( parsed ).format("MM"),
                'day' : moment( parsed ).format("DD")
            }
            return formattedDate
        };
        var time = function() {
            var parsed = moment(secondPart, "hh:mm A")
            return moment( parsed ).format("hh:mm A");
        }

        var data = {
            'title' : title,
            'location': location,
            'date' : date(),
            'time' : time()
        }
        wstream.write( JSON.stringify(data) + ',' );
    }
});
