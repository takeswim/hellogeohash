var geohash     = require('ngeohash');

var do_benchmark = function() {
    var lat = 1.0;
    var lon = 1.0;
    for(var ii = 0; ii<10000; ii++) {
        lat += 0.00001;
        lon += 0.00001;
        geohash.encode(lat, lon);
    }
};

console.time('timer');
do_benchmark();
console.timeEnd('timer');
