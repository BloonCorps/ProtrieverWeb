import React, { Component } from 'react';
import PlotComponent from './PlotComponent';
import './App.css';
import Profile from './Profile';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends Component {
  state = {
    data: [{x: 1, y: 2, name: 'A'}, {x: 2, y: 3, name: 'B'}, {x: 3, y: 5, name: 'C'}],
    plotWidth: window.innerWidth - 300,
    plotHeight: window.innerHeight 
  };

  handleResize = () => {
    this.setState({
      plotWidth: window.innerWidth - 300,
      plotHeight: window.innerHeight
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleHover = (event) => {
    const pointIndex = event.points[0].pointIndex;
    this.hoveredNode = this.state.data[pointIndex];
    this.forceUpdate(); 
  }

  render() {
    const {data, plotWidth, plotHeight} = this.state;
  
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
          <div style={{maxWidth: '300px'}}>
            {this.hoveredNode &&
              <Profile data={this.hoveredNode} />
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

