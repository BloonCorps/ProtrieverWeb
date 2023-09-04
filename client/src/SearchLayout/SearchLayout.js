import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import './SearchLayout.css';
import DataTable from './DataTable';
import LoadingIndicator from './LoadingIndicator';

const backend = process.env.REACT_APP_BACKEND_URL;

class SearchLayout extends Component {
  state = {
    searchTerm: '',
    results: [],
    loading: false,
    timeTaken: null,
  };

  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const start = performance.now();
    const response = await fetch(`${backend}/api/search/?input=${this.state.searchTerm}`);
    const data = await response.json();
    const end = performance.now();
    const timeTaken = ((end - start) / 1000).toFixed(2); // calculate time taken and convert it to seconds
    this.setState({ results: data, loading: false, timeTaken });
  };

  render() {
    return (
      <Layout>
        <div className="search-layout d-flex flex-column">
          <div className="search-container">
            <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
              <textarea
                placeholder="Instructions: search by protein sequence (limit. up to 3000 amino acids)."
                value={this.state.searchTerm}
                onChange={this.handleChange}
                className="search-input form-control"
                rows="5"
              />
              <button type="submit" className="search-button btn btn-primary">Search</button>
              {this.state.timeTaken && (
            <div className="time-taken">
              Data returned in {this.state.timeTaken} seconds.
            </div>
          )}
            </form>
            {this.state.loading && <LoadingIndicator />}
          </div>
          {this.state.results.length > 0 && !this.state.loading && (
            <div className="table-responsive">
              <DataTable data={this.state.results} />
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default SearchLayout;

