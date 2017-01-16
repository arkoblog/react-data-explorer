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


var Numerical = React.createClass({
	getInitialState: function() {
		return{
			selected1: 2,
			selected2: 3,
			numvar1:this.props.selectedOne,
			numvar2: this.props.selectedTwo
		}
	},
    handleChangeOne: function(event){
    	console.log("Hi My")
    	// var selectedVar = (this.props.headers[event.target.value]);
        this.setState({selected1: event.target.value});	
    },
    handleChangeTwo: function(event){
    	console.log("Hi")
        this.setState({selected1: event.target.value});	
    	
    	// var selectedVar = (this.props.headers[event.target.value]);
        // this.setState({numvar2: selectedVar});	
    },
    handleSubmitTwo: function (event) {
    		// event.preventDefault();
    		// console.log("submitted",this.state.numvar1, this.state.numvar2);
            // this.props.updateDataFunction(this.state.numvar1, this.state.numvar2);	
    },
	render: function() {
		// console.log("Hi",this.state.numvar1)
		return (
				<div className="row">
					<form onSubmit={this.handleSubmitTwo}>
			  			<div className="col-md-3">
				        <label>
				        	<select onChange={this.handleChangeOne} value={this.state.selected1}>
				           		{this.props.headers.map(function(listValue, i){
				            			return <option   value={i} key={i} >{listValue.toUpperCase()}</option>;
				          		}.bind(this))}
							</select> 
						</label>
					</div>					

					<div className="col-md-3">
				        <label>
				        	<select onChange={this.handleChangeTwo} value={this.state.selected2}>
				           		{this.props.headers.map(function(listValue, i){
				            			return <option  value={i} key={i} >{listValue.toUpperCase()}</option>;
				          		}.bind(this))}
							</select> 
						</label>
					</div>					

		        		<input className="btn btn-large btn-success pull-right "type="submit" value="Submit" />
					</form>
				</div>
		)}
})


module.exports = {
	getColumnHeaders: getColumnHeaders,
	Categorical: Categorical, 
	Numerical: Numerical 
}