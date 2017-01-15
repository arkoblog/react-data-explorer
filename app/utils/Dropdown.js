var React = require('react');

var getColumnHeaders = function (url, storedata) {
	d3.csv(url, function(error,data) {
  				var headerNames = d3.keys(data[0]);
				storedata(headerNames);
			}
)};


var Dropdown = React.createClass({
	getInitialState: function() {
		return{
			value:this.props.selectedYVal
		}
	},
    handleChange: function(event){
    	var selectedHeader = (this.props.headers[event.target.value]);
        this.setState({value: selectedHeader});
    },
    handleSubmit: function (event) {
    		event.preventDefault();
            this.props.updateDataFunction(this.state.value);	
    },
	render: function() {
		return (
			<div className="row">
			<div className="col-md-12 pull-right">
		      <form onSubmit={this.handleSubmit}>
		        <label>
		        	<select onChange={this.handleChange}>
		           		{this.props.headers.map(function(listValue, i){
		            			return <option  selected={listValue == this.props.selectedYVal} value={i} key={i} >{listValue}</option>;
		          		}.bind(this))}
					</select> 
				</label>
		        <input type="submit" value="Submit" /> 
		      </form>
			</div>
			</div>
		)
}
})

module.exports = {
	getColumnHeaders: getColumnHeaders,
	renderdropdown: Dropdown 
}