// =============================================================
// 
// 	charts_list.js
//
// =============================================================

import React, { Component } from 'react';
import {connect} from 'react-redux';
import ChartBars from './components/chart_bars';
import ChartSpots from './components/chart_spots';

// imports lodash plugin
import _ from 'lodash';

class Charts extends Component {
		// sets up the state handler for which books to display
	constructor(props){
		super(props);


		this.state = {
			charts: this.props.charts
		};
		
	}
	i(){
		console.log(this.props.charts);
	}
	renderCharts(chartData){

		// sets up the variable to map each pressure array and generate our chart 
		const name = chartData.name;
		const short = chartData.short;
		const data = chartData.data;
		const id = chartData.id;

		function renderFromData(){
			if (id == "1"){
				return (
					<div className="chartContainer second animated fadeInUp">
						<div className="card-block">
				        	<h4 className="card-title">{name}</h4>
				   		</div>
						<div className="chartContainer second animated fadeInUp">
							<ChartSpots chartData={data} color="#2c3982"/>
						</div>
					</div>
					);
			}
			else {
				return (
					<div>
						<div className="chartContainer second animated fadeInUp">
						<div className="card-block">
				        	<h4 className="card-title">{name}</h4>
				   		</div>
							<ChartBars chartData={data} color="#05b54e"/>
						</div>
					</div>
					);
			}
		};
		return(
			<div id={short} className="card animated fadeInDown col-md-6" key={id}>
						{renderFromData()}
			</div >
		);
	}
	
	render(){
		return(
			<div>
			{this.props.charts.map(chartData => this.renderCharts(chartData))}
		</div>
			

		);
	}

}

// this is how it's usually written, to pass the state.charts object into this container
/* function mapStateToProps(state){
	return {charts: state.charts};
} */

// exactly how it sounds, it maps the state into the props method
// whatever returns, will show up as this.props inside of BookList
// this is a built in function of React
function mapStateToProps(state) {

	// this defines the state of this component
	return {
		// this is the KEY or what we want to call what is attached to this component's .props
		charts: 
		// this is the actual DATA of the KEY data within reducers.js, which contains the JSON
		state.charts

	};

};

// if we are adding a reducer, we use mapstate to props, which is the first argument of connect, the second argument can be left empty
// since there are no actions here
export default connect(mapStateToProps)(Charts);