import React, { Component, PureComponent } from 'react';
import PlotComponent from './PlotComponent';
import Profile from './Profile';
import Layout from '../Layout/Layout';
import AppContext from '../AppContext';
import MenuLayout from './MenuLayout';
import AutoCompleteSearch from './AutoCompleteSearch';

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
      plotWidth: window.innerWidth * 0.50,
      profileWidth: window.innerWidth * 0.30,
      plotHeight: window.innerHeight * 0.9
    });
  };

  componentDidMount() {
    let dataType = this.props.dataType; // Assuming dataType is part of the component's state
    // Construct the API URL with the query parameter
    let apiUrl = `${backend}/api/data/?input=${dataType}`;
    console.log('Getting data from backend!')
    
    fetch(apiUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
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

    const { data, menuWidth, plotWidth, profileWidth, plotHeight, hoveredNode, selectedDomains } = this.state;
    
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

      updateSelectedDomains: this.updateSelectedDomains 
    };

    return (
      <AppContext.Provider value={contextValue}>
        <Layout>
        <div style={{ display: 'flex', flexDirection: 'column' }}> {/* Main flex container */}
        <div style={{ display: 'flex', width: '100%', height: '50px' }}> {/* Fixed height for AutoCompleteSearch row */}
          <div style={{ width: menuWidth }}></div> {/* Empty space above MenuLayout */}
          <div style={{ flex: 1 }}> {/* AutoCompleteSearch takes remaining width */}
            <AutoCompleteSearch />
          </div>
          <div style={{ width: profileWidth }}></div> {/* Empty space above Profile */}
        </div>
    
            <div style={{ display: 'flex', width: '100%', height: plotHeight }}> {/* Row for the main components */}
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
              <div style={{ flex: 1 }}>
                <PlotComponent
                  data={data}
                  onHover={this.handleHover}
                  selectedDomains={contextValue.selectedDomains}
                  plotWidth={plotWidth}
                  plotHeight={plotHeight}
                  onClick={this.handleClick}
                  updateSelectedDomains={this.updateSelectedDomains}
                />
              </div>
              <div style={{ width: profileWidth, height: plotHeight, overflow: 'auto' }}>
                <Profile data={hoveredNode} key={hoveredNode ? hoveredNode.id : 'default'} />
              </div>
            </div>
          </div>
        </Layout>
      </AppContext.Provider>
    );    
  }
}

export default PlotLayout;

