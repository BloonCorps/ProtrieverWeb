import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import './SearchLayout.css';

class SearchLayout extends Component {
  state = {
    searchTerm: ''
  };

  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    alert(`Searching for "${this.state.searchTerm}"`); // Replace this with your own search logic
  };

  render() {
    return (
      <div className="search-layout">
        <Navbar />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.searchTerm}
            onChange={this.handleChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default SearchLayout;

