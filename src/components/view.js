// =============================================================
// 
// 	view.js
//
// =============================================================

import React, { Component } from 'react';

// custom components
import Nav from './nav';
import Footer from './footer';
import Map from './map';
import Table from './table';
import View from '../containers/view';

export default class App extends Component {
  render() {
    return (
      <div>
      <Nav />
    	<main className="container">
      <ViewAll />
      <div>
		    <Map />
      </div>
      <Table />
      </main>
      <Footer />
    </div>
    );
  }
}