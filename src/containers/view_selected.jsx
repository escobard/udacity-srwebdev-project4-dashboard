// =============================================================
// 
// 	view_detail.js
//
// =============================================================

import React, { Component } from 'react';


import { connect } from 'react-redux';

import Map from './map/map';

class ViewSelected extends Component {

	// creates the function to apply the outro animation to the view list when the view details are expanded
	viewHide(){

		var viewDetails = document.querySelector('.viewDetails');
		var viewList = document.querySelector('.viewList');
		var postReview = document.querySelector('#postReview');
		var reviewPost = document.querySelector('#reviewPost');
		viewDetails.classList.remove('fadeInDown');
		viewDetails.classList.add('fadeOut');
		viewDetails.classList.add('heightHidden');
		setTimeout(function(){
			viewDetails.classList.add('hidden');
		}, 1000);
		
		// handles views for the view list
		viewList.classList.remove('fadeOutDown');
		viewList.classList.remove('hidden');
		viewList.classList.add('fadeInUp');
		
		// handles views for the postReview
		postReview.classList.add('hidden');
		postReview.classList.remove('fadeInUp');

		// handles views for the reviewPost
		reviewPost.classList.add('hidden');
		reviewPost.classList.remove('fadeInUp');
	}
	render(){

		if (!this.props.view){
			return (
			
				<div></div>

			);
		}
		
		return (
		<div className="col-md-12 viewDetails animated fadeInUp">
			
			<article className="card">


			    <div className="card-block">
			    	<div className="widgetTitle"> 
						<h2>{this.props.view.name}</h2>
						<div id="componentDetails" className="animated">
						</div>
					</div>

            		<div className="componentContainer">
						{this.props.view.component}

						
						</div>
						


						    <button className="btn btn-primary" onClick={() => this.viewHide()}>Return to selection</button>


					</div>

			    

			</article>
			</div>
		);
	}
	
}

// for more on how this works, refer to book_list.js
function mapStateToProps(state){
	
	// again, whatever we return from here is usable by the BookDetails class, under props
	return {
		
		view: state.activeView

	};

}

// connects the activeBook reducer to this component, making it a container by definition
export default connect (mapStateToProps) (ViewSelected);