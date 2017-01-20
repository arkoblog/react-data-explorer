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
    	var selectedHeader = (this.props.headers[event.target.value]);
        this.setState({value: selectedHeader, selected: event.target.value});
        this.props.updateDataFunction(selectedHeader, this.state.selectedOption);	
    },
	handleOptionChange: function (event) {
	  this.setState({
	    selectedOption: event.target.value
	  });
	  this.props.updateDataFunction(this.state.value, event.target.value);	
	},
	render: function() {
		return (
			<div className="row">
			  <form>
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
		      </form>
			</div>
		)
}
});



module.exports = {
	getColumnHeaders: getColumnHeaders,
	Categorical: Categorical
}