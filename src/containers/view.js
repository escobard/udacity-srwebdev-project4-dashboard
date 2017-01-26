// =============================================================
// 
// view_list.js
//  
// =============================================================


import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import selectView from '../actions/select_view'

// imports lodash plugin
import _ from 'lodash';

class View extends Component {
	// sets up the state handler for which books to display
	constructor(props){
		super(props);

		this.state = {
			searchTerm:'',
			currentlySelected: this.props.views
		};
		
		// binds the search input
		this.searchInputChange = this.searchInputChange.bind(this);
	}
	// handles the category select setting of state
	categoryFilterChange(event){

		// creates filter
		let categoryFilter = _.filter(this.props.views,view => view.category.includes(event.target.value));

		// sets the state based on filter
		this.setState({
			currentlySelected: categoryFilter
		});
		console.log(this.state.currentlySelected);
	}
	// handles the category select setting of state
	priceFilterChange(event){

		// creates filter
		let priceFilter = _.filter(this.props.views, view => view.price.includes(event.target.value));

		// sets the state based on filter
		this.setState({
			currentlySelected: priceFilter
		});
		console.log(this.state.currentlySelected);
	}
	// handles the category select setting of state
	ratingFilterChange(event){

		// creates filter 
		let ratingFilter = _.filter(this.props.views, view => view.rating.includes(event.target.value));

		// sets the state based on filter
		this.setState({
			currentlySelected: ratingFilter
		});
		console.log(this.state.currentlySelected);
	}
	// handles the search bar setting of state
	searchInputChange(event){

		// creates 
		let searchFilter = _.filter(this.props.views, view => view.title.includes(event.target.value.toLowerCase()));

		// sets the state based on filter
		this.setState({
			searchTerm: event.target.value,
			currentlySelected: searchFilter
		});
		console.log(this.state.searchTerm);
		console.log(this.state.currentlySelected);
	}
	// creates the function to apply the outro animation to theview list when theview details are expanded
	listHide(){
		
		var viewList = document.querySelector('.viewList');
		var viewDetails = document.querySelector('.viewDetails');

		// handles animations when list is hiding
		viewList.classList.add('fadeOutDown');
		viewList.classList.remove('fadeInUp');

		// handlesviewHide classes
		viewDetails.classList.remove('hidden');
		viewDetails.classList.remove('heightHidden');
		viewDetails.classList.remove('fadeOut');
		viewDetails.classList.add('fadeInDown');

		// hides from the dom after animation is over
		setTimeout(function(){
			viewList.classList.add('hidden');
		}, 1000);
		
	}
	
	// this will set up the function to render our list
	// we will be adding the list of books to our props object later
	renderList() {

		// creates the map of the books array, setting up an object for each index and calling it 'book'
		// return this.props.views.map((view) => {
		return this.state.currentlySelected.map((view) => {
			// returns our book properties within an li
			// on this.props.selectBook, it passes the value of the book that was clicked (or in other words the individual book object)
			// to the selectBook action reducer
			const rating = parseInt(view.rating);
			return (
			<article className="viewCard card col-md-4"
				key={view.title} 
			>
			<div>{view.image}</div>
		    <div className="view overlay hm-white-slight">
		        <img src="http://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg" className="img-fluid" alt="" />
		        <a href="#">
		            <div className="mask viewDetails"></div>
		        </a>
		    </div>

		    <div className="card-block">
				<h4 className="card-title">{view.title}
				<br/>
				<small> {view.category}</small></h4>
		        <p className="card-text">{view.description}</p>
		        <div className="bottom">
		        	<span className="viewPrice">${view.price} <small>avarage</small></span>
			        <a href="#" className="btn btn-primaryviewOpen"
					onClick={() => {this.props.selectView(view); this.listHide();}}
			        >
			        Learn More
			        </a>
		        </div>
		    </div>
			</article>
			);
		});
	}


	// this sets up the component for our booklist's HTML
	render() {

		//DONT FORGET TO RETURN HERE, JUST SPENT AN HOUR DEBUGGING THIS AREA
		return (
			<section className="viewList animated fadeInUp col-md-12">
				<div className="col-md-12 intro card">
		            <h3 className="h3-responsive">Select aview to get started</h3>
		            <div className="search-bar md-form col-md-12">
						<label className="hidden" htmlFor="categoryFilter">Select a Category</label>
						<input 
							id="searchBar"
							className="form-control"
							type="text"
							value={this.state.searchTerm}
							onChange={event => this.searchInputChange(event)}
							autofocus
							placeholder="Filter views by title"
						 />
					 </div>
					<div className="form-group col-md-12">
						<div className="col-md-4 selectFilter">
							<label className="hidden" htmlFor="categoryFilter">Select a Category</label>
							<select 
								id="categoryFilter"
								className="form-control"
								onChange={event => this.categoryFilterChange(event)}
							>
								<option value="">Select a Category</option>
								<option value="oriental">Oriental</option>
								<option value="fast food">Fast Food</option>
								<option value="mexican">Mexican</option>
								<option value="indian">Indian</option>
								<option value="greek">Greek</option>
							</select>
						</div>
						<div className="col-md-4 selectFilter">
							<label className="hidden" htmlFor="priceFilter">Select a Price Range</label>
							<select 
								id="priceFilter"
								className="form-control"
								onChange={event => this.priceFilterChange(event)}
							>
								<option value="">Select a Price</option>
								<option value="10">$10 Avarage</option>
								<option value="15">$15 Avarage</option>
								<option value="20">$20 Avarage</option>
								<option value="25">$25 Avarage</option>
								<option value="30">$30 Avarage</option>
							</select>
						</div>
						<div className="col-md-4 selectFilter">
							<label className="hidden" htmlFor="ratingFilter">Select Rating Range</label>
							<select 
								id="ratingFilter"
								className="form-control"
								onChange={event => this.ratingFilterChange(event)}
							>
								<option value="">Select a Rating</option>
								<option value="2">2 stars or less</option>
								<option value="3">3 stars or less</option>
								<option value="4">4 stars or less</option>
								<option value="5">5 stars or less</option>
							</select>
						</div>
					</div>
				</div>
				{this.renderList()}
			</section>
		);
	}

};

// exactly how it sounds, it maps the state into the props method
// whatever returns, will show up as this.props inside of BookList
// this is a built in function of React
function mapStateToProps(state) {

	// this defines the state of this component
	return {
		// this is the KEY or what we want to call what is attached to this component's .props
		views: 
		// this is the actual DATA of the KEY books within reducers.js, which contains the JSON
		state.views

	};

};

// creates the function to join the action creator with the BookList component, to update the app's state
// anything returned on this function, will end up as .props on the BookList container
function mapDispatchToProps(dispatch) {

	// Whenever selectBook is called, the result should be passed to all of our reducers
	// returns the react function, joining selectBook (the action Creator) to the key : selectBook
	return bindActionCreators({ 

		// this is the KEY the function selectBook is bound to
		// thanks to this key, the property from the action creator gets passed on to this.book
		selectView: 

		// this is the actual selectBook function
		selectView },

		// this is the argument
		// 
		// this actually BINDS the arguments above (selectBook) to all our reducers. If this function is called, 
		// its passed to all the reducers, changing their state if needed
		dispatch)

}

// this connects the two functions in this container together when exported
// connect takes a function, and a component (class only), and produces a container
// a container is again a component that connects react with the redux state
// 
// binds the original reducer state change and action creators to the BookList component
// 
// essentially this promotes BookList from a component to a container - react needs to know 
// about this new component selection method, selectBook.
export default connect(mapStateToProps, mapDispatchToProps) (View);