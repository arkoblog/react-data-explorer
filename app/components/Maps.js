var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var axios = require('axios');
var L = require('leaflet');
var turf = require('turf');
var Puker = require('../utils/Puker');
// var GeoJsonCluster = require ('react-geojson-cluster');
var ReactDOM = require('react-dom');



var Livemap = React.createClass({
	getInitialState: function () {
		return {
			url: this.props.url,
			data: []
		}
	},
	convertPolygonsToPoints: function (data) {
		var newdata =L.geoJson(data,{onEachFeature: function(feature,layer){
		    if (feature.geometry.type === 'Polygon') {
		        var centroid = turf.centroid(feature);
		        var lon = centroid.geometry.coordinates[0];
		        var lat = centroid.geometry.coordinates[1];
		        var coord = [Number(lat.toFixed(10)),Number(lon.toFixed(10))];
			    feature.geometry = {
			        coordinates: coord,
			        type: "Point"
			    };
		    } else if (feature.geometry.type === 'Point'){
		    	// console.log(feature.geometry.coordinates)
		    	var lon = feature.geometry.coordinates[0]
		    	var lat = feature.geometry.coordinates[1]
		    	var coord = [Number(lat.toFixed(10)),Number(lon.toFixed(10))];
		    	feature.geometry = {
			        coordinates: coord,
			        type: "Point"
			    }
		    }
			}
		});
		L.extend(newdata.properties, data.properties);
		console.log("ConvertoPoints:",data)
		return data;
	},
	loadMap: function(url) {
		axios.get(url).then(function(response){
			var mydata = this.convertPolygonsToPoints(response.data);
			console.log("mydata",mydata)
			coords = []
			mydata.features.map(function(feature, i){
			coords.push({"coordinates":[feature.geometry.coordinates[0],feature.geometry.coordinates[1]], "properties":feature.properties})})
			// this.addMarkers(coords);
			console.log("coords",coords)
			this.setState({data:coords}, this.updateMap)
		}.bind(this))
	},
	addMarkers: function(coords) {
		var Icon = L.icon({
		    iconUrl: 'data/marker2.png',
		    shadowUrl: 'data/leaf-shadow.png',
		    iconSize:     [17, 20], // size of the icon
		    shadowSize:   [10, 10], // size of the shadow
		    iconAnchor:   [8.5, 20], // point of the icon which will correspond to marker's location
		    shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [-1, -12] // point from which the popup should open relative to the iconAnchor
		});
		console.log("My Coordinates", coords[1]);
		coords.map(function(coord, i){
			// console.log(coord.coordinates,i, coord.properties["name"]);
			return L.marker(coord.coordinates, {icon: Icon})
					.addTo(this.map)
					.bindPopup(JSON.stringify(coord.properties["name"])+ i);

			}.bind(this))

	},
    componentDidMount: function() {
    	this.loadMap(this.state.url);
    },
    componentWillUnmount: function() {
        this.map.off('click', this.onMapClick);
        this.map = null;
    },
    updateMap: function() {
    		// console.log("update1",this.state.data);
    	    var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            layers: [
                L.tileLayer(
                    'https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA',
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false,
        	});
        	map.setView([28.207, 83.992],13);
        	this.addMarkers(this.state.data);

        	// var markerClusters = L.markerClusterGroup();
        	// this.map.addLayer(markerClusters);
    },
    onMapClick: function() {
        // Do some wonderful map things...
    },
    render: function() {
        return (
            <div className='map' style={{height: "500px"}}></div>
        );
    }
});


var Maps = React.createClass({
	getInitialState:function(){
		return {
			hospitals: []
		}
	},
	componentWillMount: function() {
	},
	render: function(){
		return(
				<div className="row">
					<div className="jumbotron">
						<Link to='/'>
							<button type='button' className='pull-right btn btn-large btn-danger'>Back to home</button>
						</Link>
						<h1>Maps</h1>
						<p className="link">Leaflet based maps!</p>
					</div>

					<div className="row">
						<h4>This is where my content stays!</h4>
						<Livemap url = "data/pokh_banks.geojson"></Livemap>
					</div>
					
				</div>
			)
	}
})

module.exports = Maps;

var TagStatistics = function(jsondata) {


					var json = jsondata
					var ln = jsondata.length
					var obj = {};



					for (var i = 0, j = ln; i < j; i++) {
						var hospital = (json[i].properties)
						var keys = Object.keys(hospital)
						for (var k = 0, l = keys.length; k < l; k++) {
							console.log(keys[k])
							   if (obj[keys[k]]) {
							      obj[keys[k]]++;
							   }
							   else {
							      obj[keys[k]] = 1;
							   } 
						}
					}


					console.log(JSON.stringify(obj));

}