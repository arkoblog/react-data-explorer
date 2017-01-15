var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;

var Home = React.createClass({
	render: function(){
		return(
				<div className="row">
					<div className="jumbotron">
						<h1>React Data Explorer</h1>
						<p className="link">This application is an attempt to build d3 and leaflet based components in react, and also allow users to explore and analyse data from a given input file. </p>

						<Link to='/simple'>
							<button type='button' className='btn btn-large btn-success'>Simple</button>
						</Link>
						
						<Link to='/aggregate'>
							<button type='button' className='btn btn-large btn-success'>Aggregate</button>
						</Link>

						<Link to='/leaflet'>
							<button type='button' className='btn btn-large btn-success'>Leaflet</button>
						</Link>

					</div>
					<div className="row">
						<h4>This is where my content stays!</h4>
					</div>
				</div>
			)
	}
})

module.exports = Home;