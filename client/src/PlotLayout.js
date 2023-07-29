import React, { Component } from 'react';
import PlotComponent from './PlotComponent';
import Profile from './Profile';
import Layout from './layout/Layout';
import ProteinPage from './ProteinPage';
import MenuLayout from './MenuLayout';
import AppContext from './AppContext';

class PlotLayout extends Component {
  state = {
    data: [],
    hoveredNode: null,
    menuWidth: window.innerWidth * 0.20, // width for MenuLayout
    plotWidth: window.innerWidth * 0.55, // adjust plot width
    profileWidth: window.innerWidth * 0.25, // width for Profile
    plotHeight: window.innerHeight * 0.9,
    proteinData: { name: "No protein selected", function: "No protein selected" }
  };

  handleClick = () => {
    if (this.state.hoveredNode) {
      this.setState({ proteinData: this.state.hoveredNode });
    }
  }

  handleResize = () => {
    this.setState({
      menuWidth: window.innerWidth * 0.20, // update width for MenuLayout
      plotWidth: window.innerWidth * 0.55, // update plot width
      profileWidth: window.innerWidth * 0.25, // update width for Profile
      plotHeight: window.innerHeight * 0.9
    });
  };

  componentDidMount() {
    fetch('http://protriever.org:8000/api/data/')
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
    const {data, menuWidth, plotWidth, profileWidth, plotHeight, hoveredNode, proteinData} = this.state;

    const contextValue = {
      selectedDomains: [], // Here you can put your actual value
      onSelectDomain: (domain) => {} // Here you can put your actual function
    };
    
    return (
      <AppContext.Provider value={contextValue}>
        <Layout>
          <div style={{display: 'flex', width: '100%', height: plotHeight}}>
            <div style={{
              width: menuWidth, 
              height: plotHeight, 
              overflow: 'auto',
              border: '1px solid #ddd', // Add border here
              borderRadius: '0.25rem', // Make border rounded like bootstrap cards
              padding: '0.75rem' // Add some padding
            }}>
              <MenuLayout/>
            </div>
            <div style={{width: plotWidth, height: plotHeight}}>
              <PlotComponent 
                data={data} 
                onHover={this.handleHover} 
                plotWidth={plotWidth} 
                plotHeight={plotHeight}
              />
            </div>
            <div style={{width: profileWidth, Height: plotHeight, overflow: 'auto'}}>
              <Profile data={hoveredNode} />
            </div>
          </div>
          {
            /* <div className="protein-page-container">
              <ProteinPage proteinData={proteinData} />
            </div> */
          }
        </Layout>
      </AppContext.Provider>
    );
  }  
}

export default PlotLayout;