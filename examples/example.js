var Nearest = require('../nearest');

window.addEventListener('load', function () {
  var coords = window.location.hash.substring(1).split(",")
    , lat = coords[0] || 51.5349
    , lon = coords[1] || -0.1219
    , r = document.getElementById('reviews')
    , results = new Nearest().find(reviews, { 
        coords: [lat, lon],
        limit: 10,
        within: 3
      }).forEach(function (review) {
        var i = document.createElement('li');
        i.innerHTML = ' <a href="http://www.theguardian.com/'+ review.path + '" target="_blank">'+review.restaurant +'</a>';
        i.innerHTML += ', ' + review.postcode;
        i.innerHTML += ' <small>' + review.distance + ' km</small> - reviewed by ' + review.reviewer;
        r.appendChild(i);
      });
}, false);
