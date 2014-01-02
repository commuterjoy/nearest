
var assert = require('assert')
  , should = require('should')
  , fs = require('fs') 
  , Nearest = require('../nearest.js').nearest
  , db;

beforeEach(function(done){
    db = JSON.parse(fs.readFileSync('test/resources/gu.json'))
    done();
})

describe('Nearest', function(){
    
    describe('Nearest.find()', function(){
        
        it('should exist', function(){
            (typeof new Nearest()).should.equal('object');
        })
        
        it('should find entries in proximity to a given lat/lon coordinate', function(){
            var results = new Nearest().find(db, {
                coords: [51.5349, -0.1219] 
            });
            results.length.should.equal(2);
            results[1].restaurant.should.equal('Mayfields');
        })
        
        it('should scope entries to within a given distance (in km)', function(){
            (new Nearest().find(db, {
                coords: [51.5349, -0.1219],
                within: 3
            }).length).should.equal(1);
        })
        
        it('should sort results by proximity', function() {
            (new Nearest().find(db, {
                coords: [51.5349, -0.1219],
            })[1].restaurant).should.equal('Mayfields');
        })
        it('should limit results', function() {
            (new Nearest().find(db, {
                coords: [51.5349, -0.1219],
                within: 6000,
                limit: 2
            }).length).should.equal(2);
        })


    })
})

