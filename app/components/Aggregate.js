var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;


var Home = React.createClass({
	render: function(){
		return(
				<div className="row">
					
					<div className="jumbotron">
						<Link to='/'>
							<button type='button' className='pull-right btn btn-large btn-danger'>Back to home</button>
						</Link>
						<h1>Aggregate and View</h1>
						<p className="link">Aggregate and visualize </p>
					</div>

					<div className="row">
						<h4>This is where my content stays!</h4>
					</div>

				</div>
			)
	}
})

module.exports = Home;