var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Main = require('../components/Main')
var Home = require('../components/Home')
var Simple = require('../components/Simple')
var Aggregate = require('../components/Aggregate')
var Maps = require('../components/Maps')

var routes = (
	<Router history={hashHistory}>
		<Route path='/' component = {Main}>
			<IndexRoute component={Home}/>
			<Route path = '/simple' component = {Simple}/>
			<Route path = '/aggregate' component = {Aggregate}/>
			<Route path = '/leaflet' component = {Maps}/>
		</Route>
	</Router>
);

module.exports = routes;