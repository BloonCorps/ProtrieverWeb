import React, { Component } from 'react';
import Layout from './layout/Layout';
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
      <Layout>
        <div className="search-layout">
          <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'row'}}>
            <input
              type="text"
              placeholder="Search By HGNC Name..."
              value={this.state.searchTerm}
              onChange={this.handleChange}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default SearchLayout;


