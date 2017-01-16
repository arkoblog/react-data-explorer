var React = require('react');
var d3 = require('d3');
var _ = require('lodash');

var csvLoader = function(url, xvar, yvar, storedata, c3ord3) {
	 d3.csv(url)
	  .row(function(d){
		if (!d[xvar]) {return null;}       			
		return {
			xvar: d[xvar],
          	yvar: Number(d[yvar])
		}})
	  .get(function(error,rows){
		if(error){
			console.error("Error",error);
		} else {
			var data = rows;
			// window.data = data;
			if (c3ord3=='c3'){
				// console.log("hi hi hi")
					xaxis=[];
					yaxis=['yaxis'];
					
					data.map(function(item){
						xaxis.push(item.xvar)
					});

				data.map(function(item){
					yaxis.push(item.yvar)
				});

				var c3Data = [xaxis,yaxis]
				storedata(c3Data);

			} else {
				storedata(data)
			}
		}})

	// console.log("Arogy",window.data);  
	  
};

var domainCalculator = function(data, xvar, yvar){
	var domain = {}
	if(typeof(data[1].xvar)=='string'){
  		domain.x = _.keys(_.groupBy(data, function(d){return d.xvar;}))
	} else  {
  		var numbers = _.keys(_.groupBy(data, function(d){return d.xvar;})).map(Number)
  		domain.x = [0, d3.max(numbers)]
	};

	if(typeof(data[1].yvar)=='string'){
 		 domain.y = _.keys(_.groupBy(data, function(d){return d.yvar;}))
	} else  {
  		var numbers = _.keys(_.groupBy(data, function(d){return d.yvar;})).map(Number)
  		domain.y = [0, d3.max(numbers)]
	}; 
    return  domain
};



module.exports= {
	csvLoader: csvLoader,
	domainCalculator: domainCalculator
}
