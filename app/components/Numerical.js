var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var styles = require('../styles/index')
var d3Loaders = require('../utils/d3Loaders')
var Puker = require('../utils/Puker')
var NumericalMenu = require('../utils/NumericalMenu')
var C3Chart = require('../utils/c3Chart')
require('../styles/c3ChartStyles.css')

var Numerical = React.createClass({
	getInitialState: function() {
		return {
			chartData: [],
			columnHeaders: []
		}
	},
	setChartData: function(rawData) {
		console.log("MyRawTwoData",rawData)
		// var domain = d3Loaders.domainCalculator(rawData, "xvar", "yvar")
		this.setState({chartData: rawData})

	},
	setDropDownData: function(columnHeaders) {
		this.setState({columnHeaders:columnHeaders, updateData:this.updateData })
	},
	updateData: function(numvar1, numvar2) {
			this.setState({numvar1: numvar1, numvar2: numvar2})

			d3Loaders.numCSVLoader("data/dummy.csv", numvar1, numvar2, this.setChartData,'c3');
	},
	componentWillMount: function() {
		d3Loaders.numCSVLoader("data/dummy.csv", "value2", "value3", this.setChartData,'c3');
		NumericalMenu.getColumnHeaders("data/dummy.csv", this.setDropDownData)
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
						<h3>Numerical inputs</h3>
						<hr/>
						<NumericalMenu.Numerical headers = {this.state.columnHeaders} selectedOne = 'value2' selectedTwo='value3' updateDataFunction={this.updateData}/>
						<C3Chart.Scatter id = "chart2" columns={this.state.chartData}/>
						<Puker data={this.state} />
					</div>
				</div>
			)
	}
})

module.exports = Numerical;