var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var styles = require('../styles/index')
var d3Loaders = require('../utils/d3Loaders')
var Puker = require('../utils/Puker')
var CategoricalMenu = require('../utils/CategoricalMenu')
var C3Chart = require('../utils/c3Chart')
require('../styles/c3ChartStyles.css')

var Categorical = React.createClass({
	getInitialState: function() {
		return {
			chartData: [],
			columnHeaders: [],
			chartType: 'bar'
		}
	},
	setChartData: function(rawData) {
		// console.log("MyRawData",rawData)
		this.setState({chartData: rawData})

	},
	setDropDownData: function(columnHeaders) {
		this.setState({columnHeaders:columnHeaders, updateData:this.updateData })
	},
	updateChartData: function(selectedHeader, selectedChartType) {
			this.setState({chartType: selectedChartType})
			d3Loaders.catCSVLoader("data/dummy.csv", "var", selectedHeader, this.setChartData,'c3');
	},
	componentWillMount: function() {
		d3Loaders.catCSVLoader("data/dummy.csv", "var", "value2", this.setChartData,'c3');
		CategoricalMenu.getColumnHeaders("data/dummy.csv", this.setDropDownData)
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
						<CategoricalMenu.Categorical selectedradiovar='bar'  radiovals = {radiovals} headers = {this.state.columnHeaders} updateDataFunction={this.updateChartData} selectedYVal="value2"/>
						<C3Chart.LineAreaBar id = "chart1" columns={this.state.chartData} chartType={this.state.chartType}/>
						<Puker data={this.state} />
					</div>
				</div>
			)
	}
})

module.exports = Categorical;