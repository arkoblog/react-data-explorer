var React = require('react');
var d3 = require('d3');
var c3 = require('c3');

// const columns = [
//   ['My Numbers', 30, 200, 100, 400, 150, 250],
//   ['Your Numbers', 50, 20, 10, 40, 15, 25]
// ];

var c3Chart = React.createClass({
  componentDidMount: function() {
    this._updateChart();
  },
  componentDidUpdate: function() {
    this._updateChart();
  },
  _updateChart: function() {
    console.log("MyColumns", this.props.columns[0])
     chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [this.props.columns[1]],
        type: this.props.chartType,
        labels:{
//            format: function (v, id, i, j) { return "Default Format"; },
            format: function(v,id,i,j){
               return d3.round(v,2);
//                data1: function (v, id, i, j) { return "Format for data1"; },
            }
        }
      },
      axis: {
        x:{
            type: 'category',
            categories: this.props.columns[0]
          }
      }
    });
  },
  render() {
    return <div id="chart"></div>;    
  }
});



// class App extends Component {
//   constructor(props) {
//     super(props);
//     this._setBarChart = this._setBarChart.bind(this);
//     this._setLineChart = this._setLineChart.bind(this);
//     this.state = {
//       chartType: 'line'
//     };
//   }
//   _setBarChart() {
//     this.setState({ chartType: 'bar' });
//   }
//   _setLineChart() {
//     this.setState({ chartType: 'line' });
//   }
//   render() {
//     return (
//       <div className="app-wrap">
//         <Chart 
//           columns={columns}
//           chartType={this.state.chartType} />
//         <p>
//           Chart Type
//           <button onClick={this._setBarChart}>bar</button> 
//           <button onClick={this._setLineChart}>Line</button>
//         </p>
//       </div>
//     );
//   }
// }
// })

// ReactDOM.render(
// 	<App />,
//     document.getElementById('app')
// );

module.exports=c3Chart;