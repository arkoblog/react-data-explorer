var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var axios = require('axios');
var L = require('leaflet');
var turf = require('turf');
var Puker = require('../utils/Puker');
var GeoJsonCluster = require ('react-geojson-cluster');
var ReactDOM = require('react-dom');

var Livemap = React.createClass({
	addPoints: function(url) {
		axios.get(url).then(function(response){
			// console.log("My response",response.data);
			var newdata =L.geoJson(response.data,{onEachFeature: function(feature,layer){
		                        if (feature.geometry.type === 'Polygon') {
		                            // console.log('Polygon detected');
		                            var centroid = turf.centroid(feature);
		                            var lon = centroid.geometry.coordinates[0];
        		                    var lat = centroid.geometry.coordinates[1];
        		                    var coord = [Number(lat.toFixed(10)),Number(lon.toFixed(10))];
        		                    // console.log(lon,lat);
								      feature.geometry = {
								        coordinates: coord,
								        type: "Point"
								      };
		                        }
								}
							});
					L.extend(newdata.properties, response.data.properties);
			// console.log("Other response", response.data)
			coords = []
			response.data.features.map(function(feature, i){coords.push({"coordinates":[feature.geometry.coordinates[0],feature.geometry.coordinates[1]], "properties":feature.properties})})
			this.addMarkers(coords);
		}.bind(this))
	},
	addMarkers: function(coords) {
		// console.log(coords[0])
		var greenIcon = L.icon({
		    iconUrl: 'data/marker2.png',
		    shadowUrl: 'data/leaf-shadow.png',
		    iconSize:     [17, 20], // size of the icon
		    shadowSize:   [10, 10], // size of the shadow
		    iconAnchor:   [8.5, 20], // point of the icon which will correspond to marker's location
		    shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [-1, -12] // point from which the popup should open relative to the iconAnchor
		});
		
		// console.log("MyMap",this.map);
		coords.map(function(coord, i){
			return L.marker(coord.coordinates, {icon: greenIcon})
					.addTo(this.map)
					.bindPopup(coord.properties.name)
			}.bind(this))

	},
    componentDidMount: function() {
    	// console.log(ReactDOM.findDOMNode(this));
        var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            layers: [
                L.tileLayer(
                    'https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA',
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false,
        });
        this.addPoints(this.props.url);
        map.on('click', this.onMapClick);
        map.setView([28.207, 83.992],13);
    },
    componentWillUnmount: function() {
        this.map.off('click', this.onMapClick);
        this.map = null;
    },
    onMapClick: function() {
        // Do some wonderful map things...
    },
    render: function() {
        return (
            <div className='map' style={{height: "250px"}}></div>
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
						<Livemap url = "data/pokh_hosp.geojson"></Livemap>
					</div>
					
				</div>
			)
	}
})

module.exports = Maps;
