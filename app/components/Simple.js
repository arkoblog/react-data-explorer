var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var d3Loaders = require('../utils/d3Loaders')
var Puker = require('../utils/Puker')
var dropdown = require('../utils/Dropdown')
var Chart = require('../utils/Chart')


var Simple = React.createClass({
	getInitialState: function() {
		return {
			rawData: [],
			domain: [],
			columnHeaders: []
		}
	},
	setChartData: function(rawData) {
		var domain = d3Loaders.domainCalculator(rawData, "xvar", "yvar")
		// console.log(domain)
		this.setState({rawData: rawData, domain:domain})

	},
	setDropDownData: function(columnHeaders) {
		// console.log("ColumnHeaders", columnHeaders);
		this.setState({columnHeaders:columnHeaders, updateData:this.updateData })
	},
	updateData: function(selectedHeader) {
			// this.setState({selectedColumn: selectedHeader})
			d3Loaders.csvLoader("data/dummy.csv", "var", selectedHeader, this.setChartData);
	},
	componentWillMount: function() {
		d3Loaders.csvLoader("data/dummy.csv", "var", "value2", this.setChartData);
		dropdown.getColumnHeaders("data/dummy.csv", this.setDropDownData)
	},
	componentDidMount: function() {
		// console.log(this.state.rawData);
	},
	render: function(){
		// d3Loaders.csvLoader("data/dummy.csv","var","value2", this.getdata)
		// console.log("Myarog",arogya);
		// console.log("My state",this.state)
		return(
				<div className="row">
					<div className="jumbotron">
						<Link to='/'>
							<button type='button' className='pull-right btn btn-large btn-warning'>Back to home</button>
						</Link>
						<h1>Simple load and view!</h1>
						<p className="link">Simple analysis and visualization module</p>
					</div>
					
					<div className="jumbotron">
						<h4>This is where my content stays!</h4>
						<dropdown.renderdropdown headers = {this.state.columnHeaders} updateDataFunction={this.updateData} selectedYVal="value2"/>
						<Chart data={this.state.rawData} domain={this.state.domain} type="Bar"/>
						<Puker data={this.state} />
					</div>
					
				</div>
			)
	}
})

module.exports = Simple;