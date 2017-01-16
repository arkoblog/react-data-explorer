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
			value:this.props.selectedYVal,
			selectedOption: this.props.selectedradiovar
		}
	},
    handleChange: function(event){
    	var selectedHeader = (this.props.headers[event.target.value]);
        this.setState({value: selectedHeader});
    },
    handleSubmit: function (event) {
    		event.preventDefault();
            this.props.updateDataFunction(this.state.value, this.state.selectedOption);	
    },
	handleOptionChange: function (changeEvent) {
	  this.setState({
	    selectedOption: changeEvent.target.value
	  });
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

				<div className="radio">
		          		{this.props.radiovals.map(function(listValue, i){
		            			return <div key={i} > <input type="radio" checked={this.state.selectedOption === listValue} onChange={this.handleOptionChange} value={listValue} key={i}/>{listValue} <br/></div>;
		          		}.bind(this))}

		        </div>

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