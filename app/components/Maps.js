var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var L = require('react-leaflet');
var LHelp = require('../utils/LeafletHelper');
const position = [28.207, 83.992];

var Maps = React.createClass({
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
						        <L.Map
						          style={{height: "400px"}}
						          center={position}
						          zoom={13}>
						          <L.TileLayer
						            url="https://api.mapbox.com/styles/v1/arkoblog/ciy32riqc00ij2sl5twb4jbu5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA"
						            attribution="Hi Bro!" />
						        </L.Map>
						        <LHelp/>
					</div>
					
				</div>
			)
	}
})

module.exports = Maps;