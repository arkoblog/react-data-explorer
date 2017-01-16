var React = require('react');

var getColumnHeaders = function (url, storedata) {
	d3.csv(url, function(error,data) {
  				var headerNames = d3.keys(data[0]);
				storedata(headerNames);
			}
)};


var Categorical = React.createClass({
	getInitialState: function() {
		return{
			selected:'2',
			value:this.props.selectedYVal,
			selectedOption: this.props.selectedradiovar
		}
	},
	componentWillMount: function() {
		// this.setState({})
	},
    handleChange: function(event){
    	console.log("Hi")
    	var selectedHeader = (this.props.headers[event.target.value]);
        this.setState({value: selectedHeader, selected: event.target.value});
    },
    handleSubmit: function (event) {
	    		// event.preventDefault();
            this.props.updateDataFunction(this.state.value, this.state.selectedOption);	
    },
	handleOptionChange: function (event) {
	  this.setState({
	    selectedOption: event.target.value
	  });
	},
	render: function() {
		return (
			<div className="row">
			  <form onSubmit={this.handleSubmit}>
			  	<div className="col-md-12">
			        <label>
			        	<select onChange={this.handleChange} value={this.state.selected}>
			           		{this.props.headers.map(function(listValue, i){
			            			return <option value={i} key={i} >{listValue.toUpperCase()}</option>;
			          		}.bind(this))}
						</select> 
					</label>
				</div>

			  	<div className="col-md-12">
				<label>
		          		{this.props.radiovals.map(function(listValue, i){
		            			return <span key={i} > <input type="radio" checked={this.state.selectedOption === listValue} onChange={this.handleOptionChange} value={listValue} key={i}/>{" " + listValue.toUpperCase() + " CHART "}</span>;
		          		}.bind(this))}

		        </label>
		        </div>

		        <input className="btn btn-large btn-success pull-right "type="submit" value="Submit" /> 
		      </form>
			</div>
		)
}
});



module.exports = {
	getColumnHeaders: getColumnHeaders,
	Categorical: Categorical
}