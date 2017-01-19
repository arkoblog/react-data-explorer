var React = require('react');
var L = require('leaflet');
var axios = require ('axios');
var turf =require('turf');
// var data = require('../../data/pokh_hosp.geojson')

var ConvertToPoints = function(data, callback) {
		var newdata =L.geoJson(data,{onEachFeature: function(feature,layer){
		                        if (feature.geometry.type === 'Polygon') {
		                            // console.log('Polygon detected');
		                            var centroid = turf.centroid(feature);
		                            var lon = centroid.geometry.coordinates[0];
        		                    var lat = centroid.geometry.coordinates[1];
        		                    var coord = [lon,lat];
        		                    // console.log(lon,lat);
								      feature.geometry = {
								        coordinates: coord,
								        type: "Point"
								      };
		                        }
								}
							});
		L.extend(newdata.properties, data.properties)
		// console.log("this",data);
		return (callback(data))
	}

var getData = function (url) {
	return axios.get(url)
					  .then(function(result) {    
							ConvertToPoints(result.data, MyCallBack);
					  })
};

var MyCallBack = function(data){
	console.log("Inside callback", data);
}




module.exports = ConvertToPoints;


