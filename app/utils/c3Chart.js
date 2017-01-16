var React = require('react');
var d3 = require('d3');
var c3 = require('c3');

// const columns = [
//   ['My Numbers', 30, 200, 100, 400, 150, 250],
//   ['Your Numbers', 50, 20, 10, 40, 15, 25]
// ];

var LineAreaBar = React.createClass({
  componentDidMount: function() {
    this._updateChart();
  },
  componentDidUpdate: function() {
    this._updateChart();
  },
  _updateChart: function() {
    // console.log("MyColumns", this.props.columns[0])
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

var Scatter = React.createClass({
  componentDidMount: function() {
    this._updateChart();
  },
  componentDidUpdate: function() {
    this._updateChart();
  },
  _updateChart: function() {
    console.log("MyColumns", this.props.columns)
     chart = c3.generate({
      bindto: '#'+this.props.id,
      data: {
        x: this.props.columns[0][0],
        columns: this.props.columns,
        type: 'scatter',
        labels:{
//            format: function (v, id, i, j) { return "Default Format"; },
            format: function(v,id,i,j){
               return d3.round(v,2);
//                data1: function (v, id, i, j) { return "Format for data1"; },
            }
        }
      },
      point: {
         r: 10
      },
      axis: {
          x: {
              label: this.props.columns[0][0],
              tick: {
                  fit: false
              }
          },
          y: {
              label: this.props.columns[1][0]
          }
      }
    });
  },
  render() {
    return <div id={this.props.id}></div>;    
  }
});


module.exports={
  LineAreaBar : LineAreaBar,
  Scatter: Scatter
};