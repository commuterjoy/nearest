/**
  * Nearest:- finds the nearest things to a give thing, geospatially speaking 
  *
  * Eg, given an array of objects with a lat/lon properties
  *
  *     [
  *         { place: 'london',      lat: , lon: },
  *         { place: 'manchester',  lat: , lon: },
  *         { place: 'cardiff',     lat: , lon: },
  *     ]
  *
  */
var Nearest = function () {
    return this;
}

// credit: ... 
Nearest.prototype.distanceInKm = function (lat1,lon1,lat2,lon2) {
    var deg2rad = function(deg) { return deg * (Math.PI/180) }
      , R = 6371 // Radius of the earth in km
      , dLat = deg2rad(lat2-lat1)  // deg2rad below
      , dLon = deg2rad(lon2-lon1)
      , a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
      , c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      , d = R * c; // Distance in km
      return d;
}

Nearest.prototype.find = function( dataSource, opts ) {

    var within = opts.within || 6000 // in km
      , limit = opts.limit || 50
      , lat = opts.coords[0]
      , lon = opts.coords[1]
      , that = this;

    return dataSource.map(function (record, index) { // calculate distance from give coords
        return {
         distance: parseFloat(that.distanceInKm(lat, lon, record.lat, record.lon).toFixed(2)),
         i: index 
       }
    }).sort(function (a,b) { // sort by distance
        return a.distance - b.distance
    }).filter(function (record) { // remove records above a given distance 
        return record.distance < within 
    }).map(function (record) { // return the original record
        dataSource[record.i].distance = record.distance;
        return dataSource[record.i];
    }).slice(0, limit)
}

