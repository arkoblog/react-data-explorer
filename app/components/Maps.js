var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;

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
					</div>
					
				</div>
			)
	}
})

module.exports = Maps;