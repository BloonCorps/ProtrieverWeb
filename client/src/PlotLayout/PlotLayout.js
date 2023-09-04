import React, { Component, PureComponent } from 'react';
import PlotComponent from './PlotComponent';
import Profile from './Profile';
import Layout from '../Layout/Layout';
import AppContext from '../AppContext';
import MenuLayout from './MenuLayout';

const backend = process.env.REACT_APP_BACKEND_URL;

class PlotLayout extends PureComponent {
  state = {
    data: [],
    hoveredNode: null,
    menuWidth: window.innerWidth * 0.20,
    plotWidth: window.innerWidth * 0.55,
    profileWidth: window.innerWidth * 0.25,
    plotHeight: window.innerHeight * 0.9,
    selectedDomains: []
  };

  handleResize = () => {
    this.setState({
      menuWidth: window.innerWidth * 0.20,
      plotWidth: window.innerWidth * 0.55,
      profileWidth: window.innerWidth * 0.25,
      plotHeight: window.innerHeight * 0.9
    });
  };

  componentDidMount() {
    fetch(`${backend}/api/data/`)
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        this.setState({ data });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleHover = (event, originalIndex) => {
    console.log('Hover event:', event);
    console.log('Original index:', originalIndex);
    const hoveredNode = {...this.state.data[originalIndex]};
    console.log('New hoveredNode:', hoveredNode);
    this.setState({ hoveredNode }, () => console.log('hoveredNode state after update:', this.state.hoveredNode));
  };  
  

  updateSelectedDomains = (updatedDomains) => {
    this.setState({ selectedDomains: updatedDomains });
  }

  render() {
    console.log('hoveredNode in PlotLayout:', this.state.hoveredNode);

    const { data, menuWidth, plotWidth, profileWidth, plotHeight, hoveredNode, proteinData, selectedDomains } = this.state;
    
    const contextValue = {
      selectedDomains: selectedDomains,

      onSelectDomain: async (domain) => {
        console.log(`Getting indices for domain ${domain}.`);

        const response = await fetch(`${backend}/api/domains/?name=${domain}`);

        const result = await response.json();
        if (result.indices) {
          this.setState(prevState => ({
            selectedDomains: [...prevState.selectedDomains, ...result.indices]
          }));
        }
        return result.indices;
      },

      updateSelectedDomains: this.updateSelectedDomains // Add this line
    };

    return (
      <AppContext.Provider value={contextValue}>
        <Layout>
          <div style={{ display: 'flex', width: '100%', height: plotHeight }}>
            <div style={{
              width: menuWidth,
              height: plotHeight,
              overflow: 'auto',
              border: '1px solid #ddd',
              borderRadius: '0.25rem',
              padding: '0.75rem'
            }}>
              <MenuLayout />
            </div>
            <div style={{ width: plotWidth, height: plotHeight }}>
              <PlotComponent
                data={data}
                onHover={this.handleHover}
                selectedDomains={contextValue.selectedDomains}
                plotWidth={plotWidth}
                plotHeight={plotHeight}
                onClick={this.handleClick}
                updateSelectedDomains={this.updateSelectedDomains} // Pass updateSelectedDomains to PlotComponent
              />
            </div>
            <div style={{ width: profileWidth, height: plotHeight, overflow: 'auto' }}>
              <Profile data={hoveredNode} key={hoveredNode ? hoveredNode.id : 'default'} />
            </div>
          </div>
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default PlotLayout;

