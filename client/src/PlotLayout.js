import React, { Component } from 'react';
import PlotComponent from './PlotComponent';
import './PlotLayout.css';
import Profile from './Profile';
import Layout from './layout/Layout';
import ProteinPage from './ProteinPage';

class PlotLayout extends Component {
  state = {
    data: [],
    hoveredNode: null,
    plotWidth: window.innerWidth * 0.70,
    plotHeight: window.innerHeight,
    proteinData: { name: "No protein selected", function: "No protein selected" }
  };

  handleClick = () => {
    if (this.state.hoveredNode) {
      this.setState({ proteinData: this.state.hoveredNode });
    }
  }

  handleResize = () => {
    this.setState({
      plotWidth: window.innerWidth * 0.70,
      plotHeight: window.innerHeight
    });
  };

  componentDidMount() {
    fetch('http://96.255.194.191:8000/api/data/')
      .then(response => response.json())
      .then(data => this.setState({ data }));
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleHover = (event) => {
    const pointIndex = event.points[0].pointIndex;
    this.setState({ hoveredNode: this.state.data[pointIndex] });  // Use setState here
  }

  handleClick = () => {
    this.setState({ proteinData: this.state.hoveredNode });
  }

  render() {
    const {data, plotWidth, plotHeight, hoveredNode, proteinData} = this.state;  // Add proteinData to your destructured state
  
    return (
      <Layout>
        <div style={{width: plotWidth, height: plotHeight}}>
          <PlotComponent 
            data={data} 
            onHover={this.handleHover} 
            plotWidth={plotWidth} 
            plotHeight={plotHeight}
          />
        </div>
        <div style={{ width: "100%" }}>
            <Profile data={hoveredNode} />
        </div>
        {
          /* <div className="protein-page-container">
            <ProteinPage proteinData={proteinData} />
          </div> */
        }
      </Layout>
    );
  }
}

export default PlotLayout;