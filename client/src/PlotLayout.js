import React, { Component } from 'react';
import PlotComponent from './PlotComponent';
import './App.css';
import Profile from './Profile';
import Navbar from './Navbar';
import Footer from './Footer';
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
      <div className="App" style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <Navbar />
        <div style={{display: 'flex', flexGrow: 1}}>
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
        </div>
        {
          <div className="protein-page-container">
            <ProteinPage proteinData={proteinData} />
          </div>
        }
        <Footer />
      </div>
    );
  }
}

export default PlotLayout;