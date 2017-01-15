var React = require('react');
var styles =require("../styles/index");

var Main = React.createClass({
	render: function() {
		
		return (
				<div className = "container" >
					{this.props.children}
				</div>
			)
	}
});

module.exports = Main;

