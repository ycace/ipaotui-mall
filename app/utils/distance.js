var RADIUS = 6371;

var toRad = function(n) {
  return n * Math.PI / 180;
};

var getDistance = function(from, to) {
  var fromLat = from[0];
  var fromLon = from[1];
  var toLat = to[0];
  var toLon = to[1];

  var dLat = toRad(toLat - fromLat);
  var dLon = toRad(toLon - fromLon);
  var fromLat = toRad(fromLat);
  var toLat = toRad(toLat);

  var a = Math.pow(Math.sin(dLat / 2), 2) +
          (Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat));
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS * c;
};

var measurePath = function(points) {
  return points.reduce(function(memo, point) {
    var distance = memo.lastPoint === null ? 0 : getDistance(memo.lastPoint, point);
    return { lastPoint: point, distance: distance + memo.distance };
  }, { lastPoint: null, distance: 0 }).distance;
};

module.exports = function(fromLat, fromLon, toLat, toLon) {
  if(typeof fromLat === 'number'){
    return getDistance([fromLat, fromLon], [toLat, toLon]);
  } else {
    return measurePath(fromLat);
  }
};