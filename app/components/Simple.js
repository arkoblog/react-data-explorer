var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var styles = require('../styles/index')
var d3Loaders = require('../utils/d3Loaders')
var Puker = require('../utils/Puker')
var SimpleMenu = require('../utils/Dropdown')
var C3Chart = require('../utils/c3Chart')
require('../styles/c3ChartStyles.css')

var Simple = React.createClass({
	getInitialState: function() {
		return {
			chartOneData: [],
			chartTwoData: [],
			columnHeaders: [],
			chartType: 'bar'
		}
	},
	setChartOneData: function(rawData) {
		console.log("MyRawData",rawData)
		// var domain = d3Loaders.domainCalculator(rawData, "xvar", "yvar")
		this.setState({chartOneData: rawData})

	},
	setChartTwoData: function(rawData) {
		console.log("MyRawTwoData",rawData)
		// var domain = d3Loaders.domainCalculator(rawData, "xvar", "yvar")
		this.setState({chartTwoData: rawData})

	},
	setDropDownData: function(columnHeaders) {
		this.setState({columnHeaders:columnHeaders, updateData:this.updateData })
	},
	updateChartOneData: function(selectedHeader, selectedChartType) {
			this.setState({chartType: selectedChartType})
			d3Loaders.catCSVLoader("data/dummy.csv", "var", selectedHeader, this.setChartOneData,'c3');
	},
	updateChartTwoData: function(numvar1, numvar2) {
			console.log(numvar1,numvar2)
			this.setState({numvar1: numvar1, numvar2: numvar2})
			d3Loaders.numCSVLoader("data/dummy.csv", this.state.numvar1, this.state.numvar2, this.setChartOneData,'c3');
	},

	componentWillMount: function() {
		d3Loaders.catCSVLoader("data/dummy.csv", "var", "value2", this.setChartOneData,'c3');
		d3Loaders.numCSVLoader("data/dummy.csv", "value2", "value3", this.setChartTwoData,'c3');
		SimpleMenu.getColumnHeaders("data/dummy.csv", this.setDropDownData)
	},
	componentDidMount: function() {
		// console.log(this.state.rawData);
	},
	render: function(){
		// d3Loaders.csvLoader("data/dummy.csv","var","value2", this.getdata)
		// console.log("Myarog",arogya);
		// console.log("My state",this.state)
		var radiovals = ['line','bar','spline','area', 'area-spline', 'step', 'area-step'];
		return(
				<div className="row">
					<div className="jumbotron">
						<Link to='/'>
							<button type='button' className='pull-right btn btn-large btn-danger'>Back to home</button>
						</Link>
						<h1>Simple load and view!</h1>
						<p className="link">Simple analysis and visualization module</p>
					</div>
					
					<div className="jumbotron col-md-12" style = {styles.transparentBg}>
						<h3>Categorical inputs</h3>
						<hr/>
						<SimpleMenu.Categorical selectedradiovar='bar'  radiovals = {radiovals} headers = {this.state.columnHeaders} updateDataFunction={this.updateChartOneData} selectedYVal="value2"/>
						<C3Chart.LineAreaBar id = "chart1" columns={this.state.chartOneData} chartType={this.state.chartType}/>
						<Puker data={this.state} />
					</div>
 {/*					
					<div className="jumbotron col-md-6" style = {styles.transparentBg}>
						<h3>Numerical inputs</h3>
						<hr/>
						<SimpleMenu.Numerical headers = {this.state.columnHeaders} selectedOne = 'value2' selectedTwo='value3' updateDataFunction={this.updateChartTwoData}/>
						<C3Chart.Scatter id = "chart2" columns={this.state.chartTwoData}/>
						<Puker data={this.state} />
					</div>
*/}
				</div>
			)
	}
})

module.exports = Simple;